import { Form, Outlet, useRouteError } from 'react-router-dom';
import { HttpError } from '@yowari/xremote';
import AboutDialog from '../../components/AboutDialog';
import Header from '../../components/Header';
import { useModalContext } from '../../providers/modal-provider';

export default function Layout() {
  const { open, close } = useModalContext();

  const handleOpenHelp = () => {
    open(<AboutDialog appName={import.meta.env.VITE_APP_NAME ?? ''} appVersion={import.meta.env.VITE_APP_VERSION ?? ''} onClose={close} />);
  };

  return (
    <>
      {/* <div className="bg-info-subtle text-info-emphasis text-center border-bottom border-info-subtle p-2">
        Banner message
      </div> */}

      <header className="mb-2" role="banner">
        <Header onOpenHelp={handleOpenHelp} />
      </header>

      <main className="container-fluid flex-fill position-relative">
        <Outlet />
      </main>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof HttpError) {
    if (error.response.status === 401) {
     return (
        <main className="container d-flex align-items-center h-100">
          <div className="p-5 text-center w-100">
            <p className="display-1">
              <i className="bi bi-key"></i>
            </p>
            <h1>Authentication token expired</h1>
            <p className="lead">Login again to refresh token</p>
            <div className="d-inline-flex gap-2 mb-5">
              <Form method="POST" action='/refresh-token'>
                <button className="btn btn-primary rounded-pill" type="submit">Go to login</button>
              </Form>
              <Form method="POST" action='/logout'>
                <button className="btn btn-outline-secondary rounded-pill" type="submit">Logout</button>
              </Form>
            </div>
          </div>
        </main>
      );
    }
  }

  throw error;
}
