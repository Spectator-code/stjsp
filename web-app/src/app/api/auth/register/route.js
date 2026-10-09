import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(req) {
  try {
    let { email, password, firstName, lastName, role } = await req.json();

    // Security: Input validation & sanitization
    if (!email || !password || !firstName || !lastName || !role) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Limit length to prevent DoS via massive payloads
    firstName = firstName.toString().trim().substring(0, 50);
    lastName = lastName.toString().trim().substring(0, 50);
    email = email.toString().trim().substring(0, 100);

    // Basic sanitization
    const sanitize = (str) => str.replace(/<[^>]*>?/gm, '');
    firstName = sanitize(firstName);
    lastName = sanitize(lastName);
    
    // Role validation
    const validRoles = ['student', 'staff', 'admin'];
    if (!validRoles.includes(role)) {
      return NextResponse.json({ success: false, error: 'Invalid role' }, { status: 400 });
    }

    const cookieStore = await cookies();
    
    // Create supabase client
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
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
            } catch {
            }
          },
        },
      }
    );

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json(
        { success: false, error: 'Database connection not configured' },
        { status: 500 }
      );
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          role: role || 'student',
        },
      },
    });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 401 });
    }

    return NextResponse.json({ success: true, user: data.user });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
