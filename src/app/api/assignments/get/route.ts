import { NextResponse } from 'next/server';
import { blobRead } from '@/lib/blobUtils';

export async function GET() {
  const assignments = await blobRead('assignments.json');
  return NextResponse.json(assignments);
}
