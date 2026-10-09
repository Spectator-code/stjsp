import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TuitionClient from "./TuitionClient";

export default async function Tuition() {
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

  // Fetch pending or active enrollments for the dropdown
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('*, profiles(*), courses(*)')
    .in('status', ['pending', 'active'])
    .order('created_at', { ascending: false });

  // Fetch recent payments for the ledger
  const { data: payments } = await supabase
    .from('payments')
    .select('*, enrollments(*, profiles(*), courses(*))')
    .order('created_at', { ascending: false });

  return <TuitionClient initialEnrollments={enrollments || []} initialPayments={payments || []} />;
}
