import { redirect } from 'react-router-dom';

export function requireAuth() {
  const gstoken = localStorage.getItem('gstoken');
  if (!gstoken) {
    throw redirect('/login');
  }
}

export function requireUnauth() {
  const gstoken = localStorage.getItem('gstoken');
  if (gstoken) {
    throw redirect('/');
  }
}
