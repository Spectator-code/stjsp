import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Simulate database save
    console.log('New enrollment:', body);
    return NextResponse.json({ success: true, message: 'Enrollment successful, reference ID: ' + Math.floor(Math.random() * 1000000) });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
