import { NextResponse } from 'next/server';
import { blobRead } from '@/lib/blobUtils';

export async function GET() {
  const tests = await blobRead('tests.json');
  return NextResponse.json(tests);
}
