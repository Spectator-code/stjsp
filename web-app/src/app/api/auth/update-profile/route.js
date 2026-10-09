import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    let { firstName, lastName } = await request.json();
    
    // Security: Input validation & sanitization
    if (!firstName || !lastName || typeof firstName !== 'string' || typeof lastName !== 'string') {
      return NextResponse.json({ success: false, error: "Valid first and last name are required" }, { status: 400 });
    }

    // Trim whitespace and enforce length limits to prevent DoS via massive payloads
    firstName = firstName.trim().substring(0, 50);
    lastName = lastName.trim().substring(0, 50);

    // Basic sanitization: strip out obvious HTML tags to prevent stored XSS 
    // and only allow standard name characters (letters, spaces, hyphens, and apostrophes)
    const sanitize = (str) => str.replace(/[^a-zA-Z\s\-']/g, '').trim();
    firstName = sanitize(firstName);
    lastName = sanitize(lastName);

    if (firstName.length === 0 || lastName.length === 0) {
       return NextResponse.json({ success: false, error: "Names cannot be empty" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch (error) {}
          },
        },
      }
    );

    // Get current session user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // 1. Update Auth Metadata
    const { error: updateAuthError } = await supabase.auth.updateUser({
      data: { first_name: firstName, last_name: lastName }
    });

    if (updateAuthError) {
      return NextResponse.json({ success: false, error: updateAuthError.message }, { status: 500 });
    }

    // 2. Update Profiles Table
    const { error: updateProfileError } = await supabase
      .from('profiles')
      .update({ first_name: firstName, last_name: lastName })
      .eq('id', user.id);

    if (updateProfileError) {
      return NextResponse.json({ success: false, error: updateProfileError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
