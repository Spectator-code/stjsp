import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import StudentDashboardClient from "./StudentDashboardClient";

export default async function StudentDashboard() {
  const cookieStore = await cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  );

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/portal?tab=login");
  }

  // Fetch Available Courses
  const { data: courses } = await supabase.from('courses').select('*').order('created_at', { ascending: true });

  // Fetch Student's Enrollments
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('*, courses(*)')
    .eq('student_id', user.id)
    .order('created_at', { ascending: false });

  // Fetch Payments for the student's enrollments
  let payments = [];
  let sessions = [];
  if (enrollments && enrollments.length > 0) {
    const enrollmentIds = enrollments.map(e => e.id);
    const { data: pData } = await supabase
      .from('payments')
      .select('*')
      .in('enrollment_id', enrollmentIds)
      .order('created_at', { ascending: false });
    payments = pData || [];

    const { data: sData } = await supabase
      .from('sessions')
      .select('*')
      .in('enrollment_id', enrollmentIds)
      .gte('start_time', new Date().toISOString())
      .order('start_time', { ascending: true });
    sessions = sData || [];
  }

  return (
    <StudentDashboardClient 
      user={user} 
      courses={courses || []}
      enrollments={enrollments || []}
      payments={payments}
      sessions={sessions}
    />
  );
}
