'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { getStudentName } from '@/lib/sessionUtils';

export default function TakeTest() {
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    fetch('/api/tests/get').then(res => res.json()).then(tests => setTest(tests.find(t => t.id === id)));
  }, [id]);

  const handleAnswerChange = (qIndex, value) => {
    setAnswers({ ...answers, [qIndex]: value });
  };

  const handleSubmit = async () => {
    const res = await fetch('/api/attempts/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ testId: id, studentName: getStudentName(), answers }),
    });
    const { score } = await res.json();
    setScore(score);
  };

  if (!test) return <div>Loading...</div>;

  return (
    <div>
      <h1>{test.name}</h1>
      {test.questions.map((q, index) => (
        <div key={index}>
          <p>{q.question}</p>
          {q.type === 'multiple' ? <Select>{/* options */}</Select> : <Textarea onChange={(e) => handleAnswerChange(index, e.target.value)} />}
        </div>
      ))}
      <Button onClick={handleSubmit}>Indienen</Button>
      {score && <p>Score: {score}</p>}
    </div>
  );
}
