'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { setStudentSession } from '@/lib/sessionUtils'; // Pas aan als client side cookie nodig

export default function StudentDashboard() {
  const [name, setName] = useState('');
  const [classId, setClassId] = useState('');
  const [classes, setClasses] = useState([]);
  const [assignedTests, setAssignedTests] = useState([]);

  useEffect(() => {
    fetch('/api/classes/get').then(res => res.json()).then(setClasses);
  }, []);

  const handleSubmit = async () => {
    setStudentSession(name); // Server side? Gebruik localStorage of cookie lib voor client
    // Haal assignments
    const assignments = await fetch('/api/assignments/get').then(res => res.json());
    const tests = await fetch('/api/tests/get').then(res => res.json());
    const assigned = assignments.filter(a => a.classId === classId).map(a => tests.find(t => t.id === a.testId));
    setAssignedTests(assigned);
  };

  return (
    <div>
      <Input placeholder="Je naam" value={name} onChange={(e) => setName(e.target.value)} />
      <Select onValueChange={setClassId}>
        <SelectTrigger>
          <SelectValue placeholder="Kies klas" />
        </SelectTrigger>
        <SelectContent>
          {classes.map(klas => <SelectItem key={klas.id} value={klas.id}>{klas.name}</SelectItem>)}
        </SelectContent>
      </Select>
      <Button onClick={handleSubmit}>Start</Button>
      {assignedTests.map(test => <Link key={test.id} href={`/student/tests/${test.id}`}>{test.name}</Link>)}
    </div>
  );
}
