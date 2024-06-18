export interface AboutDialogProps {
  appName: string;
  appVersion: string;
  onClose?: () => void;
}

function AboutDialog({ appName, appVersion, onClose }: AboutDialogProps): JSX.Element {
  return (
    <div className="modal fade show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">About</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3 d-flex flex-column align-items-center">
              <div className="display-1"><i className="bi bi-xbox"></i></div>
              <div>
                <h2 className="mb-0">{appName}</h2>
                <div className="small"><strong>Version</strong> {appVersion}</div>
              </div>
            </div>

            <p className="text-center">
              <a className="text-decoration-none" href="https://github.com/yowari/xremote-web" target="_blank" rel="noreferrer"><i className="bi bi-github"></i> GitHub</a>
            </p>

            <div className="small text-muted text-center">Made by <strong>yowari</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutDialog;
