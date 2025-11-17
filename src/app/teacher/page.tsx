import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/sessionUtils';
import Link from 'next/link';

export default async function TeacherDashboard() {
  if (!isAdmin()) redirect('/login');

  // Haal data op als nodig
  const tests = await fetch('/api/tests/get').then(res => res.json());

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <Link href="/teacher/tests/new">Nieuwe Toets</Link>
      <Link href="/teacher/classes">Klassen Beheren</Link>
      {/* Lijst toetsen, etc. */}
    </div>
  );
}
