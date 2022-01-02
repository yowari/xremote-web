import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Client } from '@yowari/xremote';
import { withAnonymousUser } from './withAnonymousUser';
import { ClientContext } from '../providers/client-provider';

describe('withAnonymousUser', () => {
  it('should render wrapped component when not logged in', () => {
    const client = new Client();

    const WrappedComponent = () => <>Wrapped Component</>;
    const AnonymousComponent = withAnonymousUser(WrappedComponent);

    const HomeComponent = () => <>Home Component</>;

    render(
      <MemoryRouter initialEntries={['/login']}>
        <ClientContext.Provider value={client}>
          <Routes>
            <Route index element={<HomeComponent />} />
            <Route path="login" element={<AnonymousComponent />} />
          </Routes>
        </ClientContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Wrapped Component')).toBeInTheDocument();
  });

  it('should redirect to "/" when logged in', () => {
    const client = new Client();
    client.gstoken = 'AUTH-TOKEN';

    const WrappedComponent = () => <>Wrapped Component</>;
    const AnonymousComponent = withAnonymousUser(WrappedComponent);

    const HomeComponent = () => <>Home Component</>;

    render(
      <MemoryRouter initialEntries={['/login']}>
        <ClientContext.Provider value={client}>
          <Routes>
            <Route index element={<HomeComponent />} />
            <Route path="login" element={<AnonymousComponent />} />
          </Routes>
        </ClientContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Home Component')).toBeInTheDocument();
  });
});
