import { NextRequest, NextResponse } from 'next/server';
import { generateTest } from '@/lib/openaiUtils';
import pdf from 'pdf-parse';

export async function POST(req: NextRequest) {
  const { prompt, pdfUrl } = await req.json();

  let content = prompt;
  let isPDF = false;

  if (pdfUrl) {
    isPDF = true;
    const response = await fetch(pdfUrl);
    const buffer = await response.arrayBuffer();
    const parsed = await pdf(buffer);
    content = parsed.text;
  }

  const test = await generateTest(content, isPDF);
  return NextResponse.json(test);
}
