import React from 'react';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import ClientProvider, { useClientContext } from './client-provider';

describe('ClientProvider', () => {
  const Component = () => {
    const client = useClientContext();
    expect(client).toBeDefined();
    return <>Component Example</>;
  }

  it('should render children and provide the xremote client', () => {
    render(
      <ClientProvider>
        <Component />
      </ClientProvider>
    );

    expect(screen.getByText(/Component Example/i)).toBeInTheDocument();
  });

  it('should throw an error when calling useClientContext outside the provider', () => {
    const { result } = renderHook(() => useClientContext());
    expect(result.error).toBeDefined();
  });
});
