'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [newClassName, setNewClassName] = useState('');

  useEffect(() => {
    fetch('/api/classes/get').then(res => res.json()).then(setClasses);
  }, []);

  const handleAdd = async () => {
    await fetch('/api/classes/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newClassName }),
    });
    setNewClassName('');
    // Refresh list
    fetch('/api/classes/get').then(res => res.json()).then(setClasses);
  };

  return (
    <div>
      <h1>Klassen</h1>
      <Input value={newClassName} onChange={(e) => setNewClassName(e.target.value)} placeholder="Nieuwe klas naam" />
      <Button onClick={handleAdd}>Toevoegen</Button>
      {classes.map(klas => <Card key={klas.id}>{klas.name}</Card>)}
    </div>
  );
}
