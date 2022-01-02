import { Context, useContext } from 'react';
import { ProviderError } from '../utils/provider-error';

export function useProviderContext<T>(Context: Context<T | undefined>, hookName: string, providerName: string): T {
  const context = useContext(Context);
  if (!context) {
    throw new ProviderError(hookName, providerName);
  }

  return context;
}
