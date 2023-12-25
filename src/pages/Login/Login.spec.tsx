import { PropsWithChildren } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import ModalProvider from '../../providers/modal-provider';
import ToastProvider from '../../providers/toast-provider';
import ClientProvider, { useClientContext } from '../../providers/client-provider';
import AuthProvider from '../../providers/auth-provider';
import Login from './Login';

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
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

jest.mock('../../providers/client-provider', () => ({
  __esModule: true,
  ...jest.requireActual('../../providers/client-provider'),
  useClientContext: jest.fn()
}));

const client = {
  gstoken: '',
  login: jest.fn()
};

describe('Login', () => {
  it('should render login form', () => {
    (useClientContext as jest.Mock).mockReturnValue(client);
    render(<Login />, { wrapper: Wrapper });
    expect(screen.getByRole('form', { name: /login/i })).toBeInTheDocument();
  });
  it.skip('should login when submit form', async () => {
    const oauthToken = 'OAUTH-TOKEN';
    const navigateMock = jest.fn();

    (useClientContext as jest.Mock).mockReturnValue(client);
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    (client.login as jest.Mock).mockResolvedValue(undefined);

    render(<Login />, { wrapper: Wrapper });
    userEvent.type(screen.getByLabelText(/OAuth Token/i), oauthToken);
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(client.login).toHaveBeenCalledWith(oauthToken);
    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith('/', { replace: true }));
  });
});
