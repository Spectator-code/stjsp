import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { enrollmentId, amount, paymentMethod, orNumber } = await request.json();
    
    if (!enrollmentId || !amount || !paymentMethod) {
      return NextResponse.json({ success: false, error: "Missing parameters" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll(cookiesToSet) {
            try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } catch (error) {}
          },
        },
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    const role = profile?.role || user.user_metadata?.role;
    if (!['admin', 'sysadmin', 'cashier', 'staff', 'registrar'].includes(role)) {
      return NextResponse.json({ success: false, error: "Forbidden: insufficient permissions" }, { status: 403 });
    }

    const { data, error } = await supabase.from('payments').insert([
      {
        enrollment_id: enrollmentId,
        amount: Number(amount),
        payment_method: paymentMethod,
        or_number: orNumber,
        status: 'completed' // Assume cashier payment is automatically completed
      }
    ]).select();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
