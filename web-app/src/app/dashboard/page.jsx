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

  let role = profile?.role || user.user_metadata?.role;
  
  // Temporary workaround for profiles_role_check constraint rejecting 'instructor'
  if (user.email === 'instructor@stjosephcupertino.ph' || user.email === 'danilo@stjosephcupertino.ph' || user.user_metadata?.role === 'instructor') {
      role = 'instructor';
  }

  if (role === 'student') {
    redirect('/dashboard/student');
  } else if (role === 'instructor') {
    redirect('/dashboard/instructor');
  } else {
    redirect('/dashboard/operations');
  }
}