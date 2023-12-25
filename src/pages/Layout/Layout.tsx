import { Outlet } from 'react-router-dom';
import AboutDialog from '../../components/AboutDialog';
import Header from '../../components/Header';
import { useAuthContext } from '../../providers/auth-provider';
import { useModalContext } from '../../providers/modal-provider';

function Layout(): JSX.Element {
  const { logout } = useAuthContext();
  const { open, close } = useModalContext();

  const handleOpenHelp = () => {
    open(<AboutDialog appName={process.env.REACT_APP_NAME ?? ''} appVersion={process.env.REACT_APP_VERSION ?? ''} onClose={close} />);
  };

  return (
    <>
      <header className="mb-2" role="banner">
        <Header onLogout={logout} onOpenHelp={handleOpenHelp} />
      </header>

      <main className="container-fluid">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
