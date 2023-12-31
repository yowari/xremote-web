// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { setEnv } from '@yowari/xremote';
import { invariant } from './utils/invariant';
import Home, { loader as homeLoader, action as homeAction } from './pages/Home';
import Layout, { ErrorBoundary as LayoutErrorBoundary } from './pages/Layout';
import Login, { loader as loginLoader, action as loginAction } from './pages/Login';
import { loader as logoutLoader, action as logoutAction } from './pages/Logout';
import { action as refreshTokenAction, loader as refreshTokenLoader } from './pages/RefreshToken';
import Root, { ErrorBoundary as RootErrorBoundary } from './pages/Root';
import Session from './pages/Session';
import './index.css';

setEnv({
  baseUrl: '/api/proxy/xhome',
  loginUrl: '/api/proxy/auth',
  authorizationHeader: process.env.NODE_ENV === 'development' ? 'authorization' : 'xremote-authorization'
});

const router = createBrowserRouter([
  {
    path: '',
    element: <Root />,
    errorElement: <RootErrorBoundary />,
    children: [
      {
        element: <Layout />,
        errorElement: <LayoutErrorBoundary />,
        children: [
          {
            index: true,
            element: <Home />,
            loader: homeLoader,
            action: homeAction,
          },
          {
            path: 'sessions/:sessionId',
            element: <Session />,
          },
        ],
      },
      {
        path: 'login',
        element: <Login />,
        loader: loginLoader,
        action: loginAction,
      },
      {
        path: 'logout',
        loader: logoutLoader,
        action: logoutAction,
      },
      {
        path: 'refresh-token',
        loader: refreshTokenLoader,
        action: refreshTokenAction,
      },
    ],
  },
]);


const container = document.getElementById('root');
invariant(container !== null, 'Root element not found');

const root = createRoot(container);

root.render(
  // <StrictMode>
    <RouterProvider router={router} />
  // </StrictMode>
);
