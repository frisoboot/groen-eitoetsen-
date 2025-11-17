// Importeer benodigd
import { put, list } from '@vercel/blob';

// Functie om JSON te schrijven als blob (volledige overschrijf)
export async function blobWrite(fileName: string, data: any) {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = await put(fileName, jsonString, { access: 'public' });
  return blob;
}

// Functie om JSON te lezen uit blob (neem de laatste versie)
export async function blobRead(fileName: string): Promise<any> {
  try {
    const { blobs } = await list({ prefix: fileName });
    if (blobs.length === 0) return [];
    // Sorteer op uploadedAt desc
    const latest = blobs.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())[0];
    const response = await fetch(latest.url);
    const text = await response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error('Fout bij lezen blob:', error);
    return [];
  }
}
