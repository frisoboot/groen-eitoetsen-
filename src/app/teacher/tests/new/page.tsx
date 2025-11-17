'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

export default function NewTest() {
  const [prompt, setPrompt] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [generatedTest, setGeneratedTest] = useState(null);
  const router = useRouter();

  const handleUpload = async () => {
    if (pdfFile) {
      const formData = new FormData();
      formData.append('file', pdfFile);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const { url } = await res.json();
      return url;
    }
    return null;
  };

  const handleGenerate = async () => {
    const pdfUrl = await handleUpload();
    const res = await fetch('/api/tests/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, pdfUrl }),
    });
    const test = await res.json();
    setGeneratedTest(test);
  };

  const handleSave = async () => {
    await fetch('/api/tests/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(generatedTest),
    });
    router.push('/teacher');
  };

  return (
    <div>
      <Input placeholder="Onderwerp" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      <Input type="file" onChange={(e) => setPdfFile(e.target.files?.[0] || null)} />
      <Button onClick={handleGenerate}>Genereer Toets</Button>
      {generatedTest && <Textarea value={JSON.stringify(generatedTest)} readOnly />}
      {generatedTest && <Button onClick={handleSave}>Opslaan</Button>}
    </div>
  );
}
