import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import OperationsClient from "./OperationsClient";

export default async function Operations() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); } catch (error) {}
        }
      }
    }
  );

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/portal?tab=login");
  }

  const role = user.user_metadata?.role;
  if (!['admin', 'sysadmin', 'registrar', 'staff'].includes(role)) {
    redirect("/portal?tab=login");
  }

  // Fetch active enrollments
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('id, status, course_id, courses(price)');
  
  const activeStudents = enrollments?.filter(e => e.status !== 'completed' && e.status !== 'dropped')?.length || 0;

  // Fetch all payments to calculate pending balances and today's intake
  const { data: payments } = await supabase.from('payments').select('*');
  
  const today = new Date().toDateString();
  const todaysPayments = payments?.filter(p => new Date(p.created_at).toDateString() === today) || [];
  const todayIntake = todaysPayments.reduce((sum, p) => sum + Number(p.amount), 0);
  const todaySettledCount = todaysPayments.length;

  // Calculate pending balances
  let pendingBalancesCount = 0;
  if (enrollments && payments) {
    enrollments.forEach(e => {
      const paid = payments.filter(p => p.enrollment_id === e.id).reduce((sum, p) => sum + Number(p.amount), 0);
      if (e.courses?.price && paid < e.courses.price) {
        pendingBalancesCount++;
      }
    });
  }

  // Fetch today's sessions
  const isoDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const { data: sessions } = await supabase
    .from('sessions')
    .select('*, enrollments(profiles(first_name, last_name, mobile_number))')
    .gte('start_time', isoDate + 'T00:00:00Z')
    .lte('start_time', isoDate + 'T23:59:59Z');

  return (
    <OperationsClient
      activeStudents={activeStudents}
      todayIntake={todayIntake}
      sessions={sessions || []}
      todaySettledCount={todaySettledCount}
      pendingBalancesCount={pendingBalancesCount}
    />
  );
}
