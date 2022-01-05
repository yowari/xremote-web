import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import ModalProvider from '../../providers/modal-provider';
import ToastProvider from '../../providers/toast-provider';
import ClientProvider from '../../providers/client-provider';
import AuthProvider from '../../providers/auth-provider';

const Component = () => <>Component Example</>;

const mockLogout = jest.fn();
jest.mock('../../providers/auth-provider', () => ({
  __esModule: true,
  ...jest.requireActual('../../providers/auth-provider'),
  useAuthContext: () => ({
    logout: mockLogout
  })
}));

describe('Layout', () => {
  it('should render header', () => {
    render(
      <MemoryRouter>
        <ModalProvider>
          <ToastProvider>
            <ClientProvider>
              <AuthProvider>
                <Layout />
              </AuthProvider>
            </ClientProvider>
          </ToastProvider>
        </ModalProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole('banner')).toHaveTextContent(/XRemote/i);
  });

  it('should render outlet', () => {
    render(
      <MemoryRouter>
        <ModalProvider>
          <ToastProvider>
            <ClientProvider>
              <AuthProvider>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Component />} />
                  </Route>
                </Routes>
              </AuthProvider>
            </ClientProvider>
          </ToastProvider>
        </ModalProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Component Example')).toBeInTheDocument();
  });

  it('should logout when clicking on logout button', () => {
    render(
      <MemoryRouter>
        <ModalProvider>
          <ToastProvider>
            <ClientProvider>
              <AuthProvider>
                <Layout />
              </AuthProvider>
            </ClientProvider>
          </ToastProvider>
        </ModalProvider>
      </MemoryRouter>
    );

    userEvent.click(screen.getByRole('button', { name: /logout/i }));

    expect(mockLogout).toHaveBeenCalled();
  });

  it('should open help modal', () => {
    render(
      <MemoryRouter>
        <ModalProvider>
          <ToastProvider>
            <ClientProvider>
              <AuthProvider>
                <Layout />
              </AuthProvider>
            </ClientProvider>
          </ToastProvider>
        </ModalProvider>
      </MemoryRouter>
    );

    userEvent.click(screen.getByRole('link', { name: /help/i }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
