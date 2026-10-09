import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import InstructorClient from "./InstructorClient";

export default async function InstructorDashboard() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    { cookies: { getAll() { return cookieStore.getAll() } } }
  );

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/portal?tab=login");
  }

  // Get instructor profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const instructorName = profile ? `${profile.first_name} ${profile.last_name}` : 'Unknown Instructor';

  // We should also match 'Staff Instructor' if they log in via the seed account
  const searchName = instructorName === 'Staff Instructor' ? 'Johnny Test' : instructorName; // Just a fallback if needed, but we'll fetch all and filter client side or query here.
  
  // Let's just fetch all scheduled sessions and filter in the client by their name or just fetch theirs
  const { data: sessions } = await supabase
    .from('sessions')
    .select('*, enrollments(*, profiles(*), courses(*))')
    .in('status', ['scheduled', 'in_progress', 'completed'])
    .order('start_time', { ascending: true });

  return <InstructorClient initialSessions={sessions || []} instructorName={instructorName} profile={profile} />;
}
