import { NextRequest, NextResponse } from 'next/server';
import { blobRead, blobWrite } from '@/lib/blobUtils';
import { isAdmin } from '@/lib/sessionUtils';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const assignment = await req.json();
  assignment.id = uuidv4();

  const assignments = await blobRead('assignments.json');
  assignments.push(assignment);
  await blobWrite('assignments.json', assignments);

  return NextResponse.json({ success: true });
}
