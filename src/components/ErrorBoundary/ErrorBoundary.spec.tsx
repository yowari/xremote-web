import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import toastProvider from '../../providers/toast-provider';

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });
  it('should render component when no error', () => {
    const WrappedComponent = () => <>Wrapped Component</>;

    render(
      <ErrorBoundary>
        <WrappedComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Wrapped Component')).toBeInTheDocument();

  });
  it('should show a toast on error catching', () => {
    const error = new Error('Error content');

    const WrappedComponent = () => {
      throw error;
    };

    render(
      <ErrorBoundary>
        <WrappedComponent />
      </ErrorBoundary>,
      { wrapper: toastProvider }
    );

    expect(screen.getByTestId('toast-title')).toHaveTextContent(error.name);
    expect(screen.getByTestId('toast-content')).toHaveTextContent(error.message);
  });
});
