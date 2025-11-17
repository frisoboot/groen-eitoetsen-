import { NextRequest, NextResponse } from 'next/server';
import { blobRead, blobWrite } from '@/lib/blobUtils';
import { isAdmin } from '@/lib/sessionUtils';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const test = await req.json();
  test.id = uuidv4();

  const tests = await blobRead('tests.json');
  tests.push(test);
  await blobWrite('tests.json', tests);

  return NextResponse.json({ success: true });
}
