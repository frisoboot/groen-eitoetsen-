import { NextResponse } from 'next/server';
import { blobRead } from '@/lib/blobUtils';

export async function GET() {
  const students = await blobRead('students.json');
  return NextResponse.json(students);
}
