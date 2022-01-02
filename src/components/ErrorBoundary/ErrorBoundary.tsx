import React, { PropsWithChildren, ReactNode } from 'react';
import { ToastActionType, ToastContext } from '../../providers/toast-provider';

export type ErrorBoundaryProps = PropsWithChildren<{}>;

export interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static contextType = ToastContext;
  context: React.ContextType<typeof ToastContext>;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    this.context?.dispatch({
      type: ToastActionType.PUSH_TOAST,
      payload: {
        title: error.name,
        content: error.message
      }
    });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return null;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
