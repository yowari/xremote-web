import { Outlet, useRouteError } from 'react-router-dom';
import ModalProvider from '../providers/modal-provider';
import ToastProvider from '../providers/toast-provider';

export default function Root() {
  return (
    <ModalProvider>
      <ToastProvider>
        <Outlet />
      </ToastProvider>
    </ModalProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  return (
    <main className="container d-flex align-items-center h-100">
      <div className="p-5 text-center w-100">
        <p className="display-1">
          <i className="bi bi-emoji-dizzy"></i>
        </p>
        <h1>Oups!</h1>
        <p className="lead">Something went wrong.</p>
      </div>
    </main>
  );
}
