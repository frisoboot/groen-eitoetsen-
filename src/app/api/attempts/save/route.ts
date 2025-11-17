import { NextRequest, NextResponse } from 'next/server';
import { blobRead, blobWrite } from '@/lib/blobUtils';
import { v4 as uuidv4 } from 'uuid';
import { gradeAttempt } from '@/lib/openaiUtils'; // Voor auto grading

export async function POST(req: NextRequest) {
  const attempt = await req.json();
  attempt.id = uuidv4();

  const attempts = await blobRead('attempts.json');
  attempts.push(attempt);
  await blobWrite('attempts.json', attempts);

  // Auto grade
  const tests = await blobRead('tests.json');
  const test = tests.find((t: any) => t.id === attempt.testId);
  if (!test) return NextResponse.json({ error: 'Test niet gevonden' }, { status: 404 });

  const grading = await gradeAttempt(test, attempt.answers);
  // Update de attempt met score
  const updatedAttempts = attempts.map((a: any) => a.id === attempt.id ? { ...a, score: grading.score } : a);
  await blobWrite('attempts.json', updatedAttempts);

  return NextResponse.json({ success: true, score: grading.score });
}
