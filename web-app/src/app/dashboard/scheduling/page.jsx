import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SchedulingClient from "./SchedulingClient";

export default async function Scheduling() {
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

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  const role = profile?.role || user.user_metadata?.role;
  if (!['admin', 'sysadmin', 'registrar', 'staff', 'dispatcher', 'instructor'].includes(role)) {
    redirect("/portal?tab=login");
  }

  // Fetch all sessions and related data
  const { data: sessions } = await supabase
    .from('sessions')
    .select('*, enrollments(profiles(first_name, last_name, mobile_number))')
    .order('start_time', { ascending: true });

  // Fetch enrollments with profiles
  const { data: instructors } = await supabase.from('profiles').select('*').in('role', ['staff', 'instructor']);
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('status, id, profiles(first_name, last_name, mobile_number), courses(name, price)');
    
  const activeEnrollments = enrollments?.filter(e => e.status !== 'completed' && e.status !== 'dropped') || [];
  const activeStudentsCount = activeEnrollments.length;

  return (
    <SchedulingClient
      sessions={sessions || []}
      activeEnrollments={activeEnrollments}
      activeStudents={activeStudentsCount}
      instructors={instructors || []}
      pendingBalancesCount={0}
    />
  );
}
