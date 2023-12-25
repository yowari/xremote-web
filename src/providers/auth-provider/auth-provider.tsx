import { createContext, PropsWithChildren, useState } from 'react';
import { useProviderContext } from '../../hooks/useProviderContext';
import { useClientContext } from '../client-provider';

export const AuthContext = createContext<{
  isAuth: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
} | undefined>(undefined);

export type AuthProviderProps = PropsWithChildren<{}>;

function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const client = useClientContext();

  const gstoken = localStorage.getItem('gstoken');
  if (gstoken) {
    client.gstoken = gstoken;
  }

  const [isAuth, setIsAuth] = useState(() => !!client.gstoken);

  const login = async (token: string) => {
    await client.login(token);
    localStorage.setItem('oauth-token', token);
    localStorage.setItem('gstoken', client.gstoken);
    setIsAuth(true);
  };

  const logout = async () => {
    client.logout();
    localStorage.removeItem('oauth-token');
    localStorage.removeItem('gstoken');
    setIsAuth(false);
  };

  const refreshToken = async () => {
    const oauthToken = localStorage.getItem('oauth-token');
    if (oauthToken) {
      try {
        await login(oauthToken);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useProviderContext(AuthContext, 'useAuthContext', 'AuthProvider');

export default AuthProvider;
