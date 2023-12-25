import { PropsWithChildren } from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react';
import Home from './Home';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import ModalProvider from '../../providers/modal-provider';
import ToastProvider from '../../providers/toast-provider';
import ClientProvider, { useClientContext } from '../../providers/client-provider';
import { Console, List } from '@yowari/xremote';
import userEvent from '@testing-library/user-event';
import AuthProvider from '../../providers/auth-provider';

const navigateMock = jest.fn();

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
  gstoken: 'AUTH-TOKEN',
  getConsoles: jest.fn(),
  createSession: jest.fn()
};

const emptyConsoleList: List<Console> = {
  continuationToken: '',
  totalItems: 0,
  results: []
};

const consoleList: List<Console> = {
  continuationToken: '',
  totalItems: 2,
  results: [
    {
      consoleType: 'XboxOneS',
      deviceName: 'XBOXONE',
      isDevKit: false,
      outOfHomeWarning: false,
      playPath: 'v5/sessions/home/play',
      powerState: 'ConnectedStandby',
      serverId: 'ABCDEFGHIJKLMNOP',
      wirelessWarning: true
    },
    {
      consoleType: 'XboxOneX',
      deviceName: 'XBOXONE 2',
      isDevKit: false,
      outOfHomeWarning: false,
      playPath: 'v5/sessions/home/play',
      powerState: 'ConnectedStandby',
      serverId: 'JKLMNOPQRSTUVWXZ',
      wirelessWarning: true
    }
  ]
};

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

describe('Home', () => {
  it('should fetch console list', async () => {
    (useClientContext as jest.Mock).mockReturnValue(client);
    client.getConsoles.mockResolvedValue(consoleList);

    render(<Home />, { wrapper: Wrapper });

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const consoleListElement = screen.getByRole('list', { name: /consoles/i });
    const consoles = within(consoleListElement).queryAllByRole('listitem');

    expect(consoles.length).toEqual(2);
  });
  it('should fetch and show empty console list', async () => {
    (useClientContext as jest.Mock).mockReturnValue(client);
    client.getConsoles.mockResolvedValue(emptyConsoleList);

    render(<Home />, { wrapper: Wrapper });

    const emptyConsoleListElement = await screen.findByTestId('home-emptyConsoleList');

    expect(emptyConsoleListElement).toHaveTextContent(/no console found/i);
  });
  it('should start stream', async () => {
    (useClientContext as jest.Mock).mockReturnValue(client);
    client.getConsoles.mockResolvedValue(consoleList);
    client.createSession.mockResolvedValue({ sessionId: '123' });
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(<Home />, { wrapper: Wrapper });

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    const consoleListElement = screen.getByRole('list', { name: /consoles/i });
    const consoles = within(consoleListElement).queryAllByRole('listitem');
    const startStreamButton = within(consoles[0]).getByRole('button', { name: /start stream/i });

    userEvent.click(startStreamButton);

    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith('/sessions/123'));
  });
});
