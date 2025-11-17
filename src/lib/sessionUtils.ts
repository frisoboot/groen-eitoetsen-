// Importeer next/headers voor server cookies
import { cookies } from 'next/headers';

// Set admin session
export function setAdminSession() {
  cookies().set('isAdmin', 'true', { httpOnly: true, path: '/' });
}

// Check admin session
export function isAdmin() {
  return cookies().get('isAdmin')?.value === 'true';
}

// Set student name session
export function setStudentSession(name: string) {
  cookies().set('studentName', name, { path: '/' });
}

// Get student name
export function getStudentName() {
  return cookies().get('studentName')?.value;
}
