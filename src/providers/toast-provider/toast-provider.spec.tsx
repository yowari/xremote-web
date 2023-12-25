import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToastProvider, { useToastContext, ToastActionType } from './toast-provider';

describe('ToastProvider', () => {
  const toast = {
    title: 'Toast title',
    content: 'Toast content'
  };

  let onOpenToast: any;
  const Component = () => {
    const { dispatch } = useToastContext();
    onOpenToast = () => {
      dispatch({
        type: ToastActionType.PUSH_TOAST,
        payload: toast
      })
    };
    return <>Component Example</>;
  }

  it('should create a new toast component when pushing a toast', () => {
    render(
      <ToastProvider>
        <Component />
      </ToastProvider>
    );

    act(() => onOpenToast());

    expect(screen.getByTestId('toast-title')).toHaveTextContent(toast.title);
    expect(screen.getByTestId('toast-content')).toHaveTextContent(toast.content);
  });

  it('should remove the toast component when clicking on cross', async () => {
    render(
      <ToastProvider>
        <Component />
      </ToastProvider>
    );

    act(() => onOpenToast());

    expect(screen.getByTestId('toast-title')).toHaveTextContent(toast.title);
    expect(screen.getByTestId('toast-content')).toHaveTextContent(toast.content);

    const crossButton = screen.getByRole('button', { name: /close/i });
    await userEvent.click(crossButton);

    expect(screen.queryByTestId('toast-title')).not.toBeInTheDocument();
    expect(screen.queryByTestId('toast-content')).not.toBeInTheDocument();
  });
});
