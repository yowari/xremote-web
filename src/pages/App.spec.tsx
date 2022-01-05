import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import ClientProvider from '../providers/client-provider';
import ToastProvider from '../providers/toast-provider';
import ModalProvider from '../providers/modal-provider';
import AuthProvider from '../providers/auth-provider';

const Wrapper = ({ children }: PropsWithChildren<{}>) => {
  return (
    <MemoryRouter>
      <ModalProvider>
        <ToastProvider>
          <ClientProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ClientProvider>
        </ToastProvider>
      </ModalProvider>
    </MemoryRouter>
  );
}

describe('App', () => {
  it('renders correctly', () => {
    render(<App />, { wrapper: Wrapper });
  });
});
