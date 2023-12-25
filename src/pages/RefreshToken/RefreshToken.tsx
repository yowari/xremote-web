import { json, redirect } from 'react-router-dom';

export function loader() {
  throw new Response('Page not found', { status: 404 });
  // eslint-disable-next-line no-unreachable
  return json({});
}

export function action() {
  localStorage.removeItem('gstoken');
  return redirect('/login');
}
