import { NextRequest, NextResponse } from 'next/server';
import { blobRead, blobWrite } from '@/lib/blobUtils';
import { isAdmin } from '@/lib/sessionUtils';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  if (!isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const klas = await req.json();
  klas.id = uuidv4();

  const classes = await blobRead('classes.json');
  classes.push(klas);
  await blobWrite('classes.json', classes);

  return NextResponse.json({ success: true });
}
