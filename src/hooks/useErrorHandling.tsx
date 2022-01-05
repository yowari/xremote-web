import { HttpError } from '@yowari/xremote';
import { useEffect } from 'react';
import AuthDialog from '../components/AuthDialog';
import { ToastActionType, useToastContext } from '../providers/toast-provider';
import { useAuthContext } from '../providers/auth-provider';
import { useModalContext } from '../providers/modal-provider';

export function useErrorHandling(): void {
  const { dispatch } = useToastContext();
  const { open, close } = useModalContext();
  const { logout, refreshToken } = useAuthContext();

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

    const onunhandledrejection = async (event: PromiseRejectionEvent) => {
      const error = event.reason;

      if (error instanceof HttpError) {
        if (error.response.status === 401) {
          open(<AuthDialog />);
          const success = await refreshToken();
          close();
          if (success) {
            close();
          } else {
            logout();
          }
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
  }, [dispatch, refreshToken, logout, close, open]);
}
