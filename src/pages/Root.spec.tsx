import { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Root from './Root';
import ToastProvider from '../providers/toast-provider';
import ModalProvider from '../providers/modal-provider';

const Wrapper = ({ children }: PropsWithChildren<{}>) => {
  return (
    <MemoryRouter>
      <ModalProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </ModalProvider>
    </MemoryRouter>
  );
}

describe('App', () => {
  it('renders correctly', () => {
    render(<Root />, { wrapper: Wrapper });
  });
});
