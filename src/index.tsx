import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './pages/App';
import AuthProvider from './providers/auth-provider';
import ClientProvider from './providers/client-provider';
import ModalProvider from './providers/modal-provider';
import ToastProvider from './providers/toast-provider';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found');
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <ToastProvider>
          <ClientProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ClientProvider>
        </ToastProvider>
      </ModalProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
