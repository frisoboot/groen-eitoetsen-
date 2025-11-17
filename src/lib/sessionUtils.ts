// Importeer next/headers alleen voor server functions
import { cookies as serverCookies } from 'next/headers';

// Voor client-side, export aparte functions
import Cookies from 'js-cookie';

// Server: Set admin session
export function setAdminSession() {
  serverCookies().set('isAdmin', 'true', { httpOnly: true, path: '/' });
}

// Server: Check admin session
export function isAdmin() {
  return serverCookies().get('isAdmin')?.value === 'true';
}

// Client/Server: Set student session (gebruik Cookies voor client)
export function setStudentSession(name: string) {
  Cookies.set('studentName', name, { path: '/' });
}

// Client/Server: Get student name
export function getStudentName() {
  return Cookies.get('studentName');
}
