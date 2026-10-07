import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      passRate: '99.4%',
      graduates: 5200,
      fleetSize: 14,
      mentors: 8
    }
  });
}
