import { json, redirect } from 'react-router-dom';
import { logout } from '../../utils/auth-service';

export function loader() {
  throw new Response('Page not found', { status: 404 });
  // eslint-disable-next-line no-unreachable
  return json({});
}

export function action() {
  logout();
  return redirect('/');
}
