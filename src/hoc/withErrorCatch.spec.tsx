import { PropsWithChildren } from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import withErrorCatch from './withErrorCatch';
import ToastProvider from '../providers/toast-provider';
import ClientProvider from '../providers/client-provider';
import AuthProvider from '../providers/auth-provider';
import ModalProvider from '../providers/modal-provider';

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
  )
}

describe('withErrorCatch', () => {
  let consoleError: jest.SpyInstance;
  beforeEach(() => {
    consoleError = jest.spyOn(console, 'error');
    consoleError.mockImplementation(() => null);
  });
  afterEach(() => {
    consoleError.mockRestore();
  });
  it('should render component when no error', () => {
    const WrappedComponent = () => <>Wrapped Component</>;
    const ErrorComponent = withErrorCatch(WrappedComponent);

    render(<ErrorComponent />, { wrapper: Wrapper });

    expect(screen.getByText('Wrapped Component')).toBeInTheDocument();

  });
  it('should show a toast on error catching', () => {
    const error = new Error('Error content');

    const WrappedComponent = () => {
      throw error;
    };
    const ErrorComponent = withErrorCatch(WrappedComponent);

    render(<ErrorComponent />, { wrapper: Wrapper });

    expect(screen.getByTestId('toast-title')).toHaveTextContent(error.name);
    expect(screen.getByTestId('toast-content')).toHaveTextContent(error.message);
  });
});
