import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Client } from '@yowari/xremote';
import { withAuthUser } from './withAuthUser';
import { ClientContext } from '../providers/client-provider';
import AuthProvider from '../providers/auth-provider';

describe('withAuthUser', () => {
  it('should render wrapped component when logged in', () => {
    const client = new Client();
    client.gstoken = 'AUTH-TOKEN';

    const WrappedComponent = () => <>Wrapped Component</>;
    const AuthComponent = withAuthUser(WrappedComponent);

    const LoginComponent = () => <>Login Component</>;

    render(
      <MemoryRouter initialEntries={['/auth']}>
        <ClientContext.Provider value={client}>
          <AuthProvider>
            <Routes>
              <Route path="login" element={<LoginComponent />} />
              <Route path="auth" element={<AuthComponent />} />
            </Routes>
          </AuthProvider>
        </ClientContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Wrapped Component')).toBeInTheDocument();
  });

  it('should redirect to "/login" when not logged in', () => {
    const client = new Client();

    const WrappedComponent = () => <>Wrapped Component</>;
    const AuthComponent = withAuthUser(WrappedComponent);

    const LoginComponent = () => <>Login Component</>;

    render(
      <MemoryRouter initialEntries={['/auth']}>
        <ClientContext.Provider value={client}>
          <AuthProvider>
            <Routes>
              <Route path="login" element={<LoginComponent />} />
              <Route path="auth" element={<AuthComponent />} />
            </Routes>
          </AuthProvider>
        </ClientContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Login Component')).toBeInTheDocument();
  });
});
