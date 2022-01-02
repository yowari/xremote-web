import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  useReducer
} from 'react';
import ToastComponent from '../../components/Toast';
import { useProviderContext } from '../../hooks/useProviderContext';

export interface Toast {
  title: string;
  content: string;
}

export enum ToastActionType {
  PUSH_TOAST = 'PUSH_TOAST',
  CLOSE_TOAST = 'CLOSE_TOAST'
}

export type ToastAction =
  | { type: ToastActionType.PUSH_TOAST; payload: Toast; }
  | { type: ToastActionType.CLOSE_TOAST; payload: Toast; };

export interface ToastContextState {
  toasts: Toast[];
}

const initialState: ToastContextState = {
  toasts: []
}

export const toastReducer = (state: ToastContextState, action: ToastAction): ToastContextState => {
  const newState = { ...state };

  switch (action.type) {
    case ToastActionType.PUSH_TOAST:
      newState.toasts = [...newState.toasts, action.payload];
      break;

    case ToastActionType.CLOSE_TOAST:
      newState.toasts = newState.toasts.filter((toast) => toast !== action.payload);
      break;

    default:
      throw new Error('Unknown Toast Action provided in Toast Provider');
  }

  return newState;
};

export const ToastContext = createContext<{
  state: ToastContextState;
  dispatch: Dispatch<ToastAction>;
} | undefined>(undefined);

export type ToastProviderProps = PropsWithChildren<{}>;

function ToastProvider({ children }: ToastProviderProps): JSX.Element {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const closeToast = (toast: Toast) => {
    return () => dispatch({
      type: ToastActionType.CLOSE_TOAST,
      payload: toast
    });
  };

  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {children}
      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: '11', maxHeight: '100%', overflow: 'auto' }}>
        <div className="toast-container">
          {state.toasts.map((toast, index) =>
            <ToastComponent key={index} title={toast.title} content={toast.content} onClose={closeToast(toast)} />
          )}
        </div>
      </div>
    </ToastContext.Provider>
  );
}

export const useToastContext = () => useProviderContext(ToastContext, 'useToastContext', 'ToastProvider');

export default ToastProvider;
