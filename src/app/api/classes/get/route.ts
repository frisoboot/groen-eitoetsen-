import { NextResponse } from 'next/server';
import { blobRead } from '@/lib/blobUtils';

export async function GET() {
  const classes = await blobRead('classes.json');
  return NextResponse.json(classes);
}
