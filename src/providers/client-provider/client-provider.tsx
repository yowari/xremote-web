import React, { createContext, PropsWithChildren, useRef } from 'react';
import { Client, setEnv } from '@yowari/xremote';
import { useProviderContext } from '../../hooks/useProviderContext';

setEnv({
  baseUrl: '/proxy/xhome',
  loginUrl: '/proxy/auth'
});

export const ClientContext = createContext<Client | undefined>(undefined);

export type ClientProviderProps = PropsWithChildren<{}>;

function ClientProvider({ children }: ClientProviderProps): JSX.Element {
  const client = useRef(new Client());

  return (
    <ClientContext.Provider value={client.current}>
      {children}
    </ClientContext.Provider>
  );
}

export const useClientContext = () => useProviderContext(ClientContext, 'useClientContext', 'ClientProvider');

export default ClientProvider;
