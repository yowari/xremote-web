import { createContext, PropsWithChildren, useState } from 'react';
import { useProviderContext } from '../../hooks/useProviderContext';

const ModalContext = createContext<{
  open: (modal: JSX.Element) => void;
  close: () => void;
} | undefined>(undefined);

export type ModalProviderProps = PropsWithChildren<{}>;

function ModalProvider({ children }: ModalProviderProps): JSX.Element {
  const [modal, setModal] = useState<JSX.Element | null>(null);

  const open = (modal: JSX.Element) => {
    setModal(modal);
  };

  const close = () => {
    setModal(null);
  };

  return (
    <ModalContext.Provider value={{ open, close }}>
      <div className={'h-100 d-flex flex-column' + (modal ? ' modal-open overflow-hidden' : '')}>
        {children}
        {modal}
        <div className={'modal-backdrop fade show ' + (modal ? 'd-block' : 'd-none')}></div>
      </div>
    </ModalContext.Provider>
  );
}

export const useModalContext = () => useProviderContext(ModalContext, 'useModalContext', 'ModalProvider');

export default ModalProvider;
