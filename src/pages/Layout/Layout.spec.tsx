import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from './Layout';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ModalProvider from '../../providers/modal-provider';
import ToastProvider from '../../providers/toast-provider';
import ClientProvider from '../../providers/client-provider';
import userEvent from '@testing-library/user-event';

const Component = () => <>Component Example</>;
const LoginComponent = () => <>Login Component</>

describe('Layout', () => {
  it('should render header', () => {
    render(
      <MemoryRouter>
        <ModalProvider>
          <ToastProvider>
            <ClientProvider>
              <Layout />
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
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Component />} />
                </Route>
                <Route path="login" element={<LoginComponent />} />
              </Routes>
            </ClientProvider>
          </ToastProvider>
        </ModalProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Component Example')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /logout/i }));

    expect(screen.getByText('Login Component')).toBeInTheDocument();
  });

  it('should open help modal', () => {
    render(
      <MemoryRouter>
        <ModalProvider>
          <ToastProvider>
            <ClientProvider>
              <Layout />
            </ClientProvider>
          </ToastProvider>
        </ModalProvider>
      </MemoryRouter>
    );

    userEvent.click(screen.getByRole('link', { name: /help/i }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
