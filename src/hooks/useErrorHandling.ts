import { HttpError } from '@yowari/xremote';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClientContext } from '../providers/client-provider';
import { ToastActionType, useToastContext } from '../providers/toast-provider';

export function useErrorHandling(): void {
  const { dispatch } = useToastContext();
  const navigate = useNavigate();
  const client = useClientContext();

  useEffect(() => {
    const pushErrorToast = (error: Error) => {
      dispatch({
        type: ToastActionType.PUSH_TOAST,
        payload: {
          title: error.name,
          content: error.message
        }
      });
    }

    const onunhandledrejection = (event: PromiseRejectionEvent) => {
      const error = event.reason;

      if (error instanceof HttpError) {
        if (error.response.status === 401) {
          client.logout();
          navigate('/login');
        } else {
          pushErrorToast(error);
        }
      } else {
        pushErrorToast(error);
      }
    }

    window.addEventListener('unhandledrejection', onunhandledrejection);

    return () => {
      window.removeEventListener('unhandledrejection', onunhandledrejection);
    };
  }, [dispatch, client, navigate]);
}
