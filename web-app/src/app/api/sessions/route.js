import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

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

  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    
    const role = profile?.role || user.user_metadata?.role;
    if (!['admin', 'sysadmin', 'registrar', 'staff', 'dispatcher', 'instructor'].includes(role)) {
      return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
    }

    const payload = await request.json();
    
    if (!payload.enrollment_id && (!payload.enrollment_ids || payload.enrollment_ids.length === 0)) {
        return new Response(JSON.stringify({ error: "Missing enrollment_id" }), { status: 400 });
    }

    
    let startTimestamp = new Date();
    let endTimestamp = new Date();
    
    // Simple parser for "01:00 PM" to Date object for today
    try {
        const timeParts = (payload.start_time || '08:00 AM').match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (timeParts) {
            let hours = parseInt(timeParts[1]);
            const mins = parseInt(timeParts[2]);
            if (timeParts[3].toUpperCase() === 'PM' && hours < 12) hours += 12;
            if (timeParts[3].toUpperCase() === 'AM' && hours === 12) hours = 0;
            startTimestamp.setHours(hours, mins, 0, 0);
        }
        
        const endTimeParts = (payload.end_time || '10:00 AM').match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (endTimeParts) {
            let hours = parseInt(endTimeParts[1]);
            const mins = parseInt(endTimeParts[2]);
            if (endTimeParts[3].toUpperCase() === 'PM' && hours < 12) hours += 12;
            if (endTimeParts[3].toUpperCase() === 'AM' && hours === 12) hours = 0;
            endTimestamp.setHours(hours, mins, 0, 0);
        }
    } catch(e) {}

    // Conflict Detection Engine
    const instructor = payload.instructor_id || 'unassigned';
    const vehicle = payload.vehicle_id || 'unassigned';

    const safeInstructor = instructor.replace(/"/g, '');
    const safeVehicle = vehicle.replace(/"/g, '');

    if (instructor !== 'unassigned' || vehicle !== 'unassigned') {
      const { data: conflicts } = await supabase
        .from('sessions')
        .select('id, instructor_name, vehicle_info, start_time, end_time')
        .neq('status', 'cancelled')
        .or(`instructor_name.eq."${safeInstructor}",vehicle_info.eq."${safeVehicle}"`);

      if (conflicts && conflicts.length > 0) {
        const hasConflict = conflicts.some(c => {
          const cStart = new Date(c.start_time).getTime();
          const cEnd = new Date(c.end_time).getTime();
          const reqStart = startTimestamp.getTime();
          const reqEnd = endTimestamp.getTime();
          
          const isOverlapping = reqStart < cEnd && reqEnd > cStart;
          const isSameResource = (instructor !== 'unassigned' && c.instructor_name === instructor) || 
                                 (vehicle !== 'unassigned' && c.vehicle_info === vehicle);
          
          return isOverlapping && isSameResource;
        });

        if (hasConflict) {
          return new Response(JSON.stringify({ error: "Scheduling Conflict: The selected instructor or vehicle is already booked during this time frame." }), { status: 409 });
        }
      }
    }
    
    let inserts = [];
    if (payload.enrollment_ids && Array.isArray(payload.enrollment_ids) && payload.enrollment_ids.length > 0) {
      inserts = payload.enrollment_ids.map(id => ({
        enrollment_id: id,
        start_time: startTimestamp.toISOString(),
        end_time: endTimestamp.toISOString(),
        instructor_name: payload.instructor_id || 'unassigned',
        vehicle_info: payload.vehicle_id || 'unassigned',
        status: 'scheduled',
        notes: payload.notes || ''
      }));
    } else {
      inserts = [{
        enrollment_id: payload.enrollment_id,
        start_time: startTimestamp.toISOString(),
        end_time: endTimestamp.toISOString(),
        instructor_name: payload.instructor_id || 'unassigned',
        vehicle_info: payload.vehicle_id || 'unassigned',
        status: 'scheduled',
        notes: payload.notes || ''
      }];
    }

    const { data, error } = await supabase.from('sessions').insert(inserts).select();


    if (error) {
      console.error("Session insertion error:", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, session: data[0] }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error("Session POST API Error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

export async function PATCH(request) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll() { return cookieStore.getAll(); }, setAll(c) { try { c.forEach(({name,value,options}) => cookieStore.set(name,value,options)); }catch(e){} } } }
  );
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    const role = profile?.role || user.user_metadata?.role;
    if (!['admin', 'sysadmin', 'registrar', 'staff', 'dispatcher', 'instructor'].includes(role)) {
      return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
    }
    
    const payload = await request.json();
    if (!payload.id) return new Response(JSON.stringify({ error: 'Missing session id' }), { status: 400 });

    const updateData = {};
    if (payload.status) updateData.status = payload.status;
    if (payload.vehicle_info) updateData.vehicle_info = payload.vehicle_info;
    if (payload.instructor_name) updateData.instructor_name = payload.instructor_name;
    if (payload.start_time) updateData.start_time = payload.start_time;
    if (payload.end_time) updateData.end_time = payload.end_time;

    if (Object.keys(updateData).length === 0) return new Response(JSON.stringify({ error: 'No fields to update' }), { status: 400 });

    const { data, error } = await supabase.from('sessions').update(updateData).eq('id', payload.id).select();
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

    return new Response(JSON.stringify({ success: true, session: data[0] }), { status: 200, headers: {'Content-Type': 'application/json'} });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
