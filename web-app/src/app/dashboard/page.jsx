import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
      }
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/portal');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  const role = profile?.role || user.user_metadata?.role;

  if (role === 'student') {
    redirect('/dashboard/student');
  } else if (role === 'instructor') {
    redirect('/dashboard/instructor');
  } else {
    redirect('/dashboard/operations');
  }
}