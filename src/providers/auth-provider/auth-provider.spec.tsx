import { render, screen } from '@testing-library/react';
import AuthProvider from './auth-provider';
import ClientProvider from '../client-provider';

const Component = () => <>Component Example</>;

const mockClient = {
  gstoken: '',
  login: jest.fn()
};

jest.mock('../client-provider', () => ({
  __esModule: true,
  ...jest.requireActual('../client-provider'),
  useClientContext: () => mockClient
}));

describe('AuthProvider', () => {
  it('should render children', () => {
    render(
      <ClientProvider>
        <AuthProvider>
          <Component />
        </AuthProvider>
      </ClientProvider>
    );

    expect(screen.getByText(/Component Example/i)).toBeInTheDocument();
  });
  it('should initialize client gstoken when provided in localstorage', () => {
    const gstoken = 'GSTOKEN';
    jest.spyOn(localStorage.__proto__, 'getItem').mockReturnValueOnce(gstoken);

    render(
      <ClientProvider>
        <AuthProvider>
          <Component />
        </AuthProvider>
      </ClientProvider>
    );

    expect(mockClient.gstoken).toEqual(gstoken);
  });
});
