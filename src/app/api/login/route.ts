import { NextRequest, NextResponse } from 'next/server';
import { setAdminSession } from '@/lib/sessionUtils';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (password === process.env.ADMIN_PASSWORD) {
    setAdminSession();
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false }, { status: 401 });
}
