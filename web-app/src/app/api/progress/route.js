import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
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
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  const role = profile?.role || user.user_metadata?.role;
  if (!['admin', 'sysadmin', 'instructor', 'staff', 'dispatcher'].includes(role)) {
    return NextResponse.json({ error: "Forbidden: insufficient permissions" }, { status: 403 });
  }

  const payload = await request.json();

  const { data, error } = await supabase.from('training_progress').insert([{
    student_id: payload.student_id,
    instructor_name: payload.instructor_name,
    schedule_id: payload.schedule_id,
    training_date: payload.training_date,
    skills_covered: payload.skills_covered,
    remarks: payload.remarks,
    progress_status: payload.progress_status
  }]).select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Optionally mark the session as 'completed'
  if (payload.progress_status === 'Completed' || payload.progress_status === 'Satisfactory') {
    await supabase.from('sessions').update({ status: 'completed' }).eq('id', payload.schedule_id);
  }

  return NextResponse.json({ success: true, progress: data[0] });
}
