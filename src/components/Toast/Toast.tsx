export interface ToastProps {
  title: string;
  content: string;
  onClose?: () => void;
}

function Toast({ title, content, onClose }: ToastProps): JSX.Element {
  return (
    <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
      <div className="toast-header bg-danger text-white">
        <strong className="me-auto" data-testid="toast-title">{title}</strong>
        <button
         type="button"
         className="btn-close btn-close-white"
         data-bs-dismiss="toast"
         aria-label="Close"
         onClick={onClose}
        ></button>
      </div>
      <div className="toast-body" data-testid="toast-content">
        {content}
      </div>
    </div>
  );
}

export default Toast;
