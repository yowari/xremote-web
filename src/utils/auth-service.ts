import { createClient } from './client';

export async function login(oauthToken: string) {
  const client = createClient();
  await client.login(oauthToken);

  localStorage.setItem('oauth-token', oauthToken);
  localStorage.setItem('gstoken', client.gstoken);
}

export function logout() {
  localStorage.removeItem('oauth-token');
  localStorage.removeItem('gstoken');
}

export async function refreshToken() {
  const oauthToken = localStorage.getItem('oauth-token');

  if (typeof oauthToken !== 'string') {
    return false;
  }

  try {
    const client = createClient();
    await client.login(oauthToken);

    localStorage.setItem('gstoken', client.gstoken);

    return true;
  } catch {
    return false;
  }
};
