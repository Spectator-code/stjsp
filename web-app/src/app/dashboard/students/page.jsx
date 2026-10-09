import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import StudentsClient from "./StudentsClient";
import { redirect } from "next/navigation";

export default async function StudentsPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  );

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/portal");
  }

  // Fetch all students and their enrollments/courses
  const { data: students, error: profilesError } = await supabase
    .from('profiles')
    .select(`
      id,
      first_name,
      last_name,
      role,
      enrollments (
        id,
        status,
        hours_completed,
        ref_code,
        courses (
          name,
          required_hours
        )
      )
    `)
    .eq('role', 'student');

  if (profilesError) {
    console.error("Error fetching students:", profilesError);
  }

  return <StudentsClient students={students || []} />;
}