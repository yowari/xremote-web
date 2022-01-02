import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import About from '../../components/About';
import Header from '../../components/Header';
import { useClientContext } from '../../providers/client-provider';
import { useModalContext } from '../../providers/modal-provider';

function Layout(): JSX.Element {
  const client = useClientContext();
  const navigate = useNavigate();
  const { open, close } = useModalContext();

  const handleLogout = () => {
    client.logout();
    navigate('/login');
  };

  const handleOpenHelp = () => {
    open(<About appName={process.env.REACT_APP_NAME ?? ''} appVersion={process.env.REACT_APP_VERSION ?? ''} onClose={close} />);
  };

  return (
    <>
      <header className="mb-2" role="banner">
        <Header onLogout={handleLogout} onOpenHelp={handleOpenHelp} />
      </header>

      <main className="container-fluid">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
