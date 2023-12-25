import { ComponentType } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import { useErrorHandling } from '../hooks/useErrorHandling';

const withErrorCatch = <P extends object>(WrappedComponent: ComponentType<P>) => (props: P) => {
  useErrorHandling();

  return (
    <ErrorBoundary>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );
}

export default withErrorCatch;
