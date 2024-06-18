import { act, render, screen } from '@testing-library/react';
import ModalProvider, { useModalContext } from './modal-provider';

describe('ModalProvider', () => {
  const Modal = () => <>Modal Component</>;

  let onOpenModal: any;
  let onCloseModal: any;
  const Component = () => {
    const { open, close } = useModalContext();
    onOpenModal = () => {
      open(<Modal />);
    };
    onCloseModal = () => {
      close();
    };
    return <>Component Example</>;
  }

  it('should display children', () => {
    render(
      <ModalProvider>
        <Component />
      </ModalProvider>
    );

    expect(screen.getByText(/Component Example/i)).toBeInTheDocument();
  });

  it('should display modal when openning a new one', () => {
    render(
      <ModalProvider>
        <Component />
      </ModalProvider>
    );

    act(() => onOpenModal());

    expect(screen.getByText(/Modal Component/i)).toBeInTheDocument();
  });

  it('should hide modal when closing it', () => {
    render(
      <ModalProvider>
        <Component />
      </ModalProvider>
    );

    act(() => onOpenModal());
    expect(screen.getByText(/Modal Component/i)).toBeInTheDocument();

    act(() => onCloseModal());
    expect(screen.queryByText(/Modal Component/i)).not.toBeInTheDocument();
  });
});
