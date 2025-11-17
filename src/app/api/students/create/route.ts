import { NextRequest, NextResponse } from 'next/server';
import { blobRead, blobWrite } from '@/lib/blobUtils';
import { isAdmin } from '@/lib/sessionUtils';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const student = await req.json();
  student.id = uuidv4();

  const students = await blobRead('students.json');
  students.push(student);
  await blobWrite('students.json', students);

  return NextResponse.json({ success: true });
}
