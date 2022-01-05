import React from 'react';

function AuthDialog(): JSX.Element {
  return (
    <div className="modal fade show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Authentication</h5>
          </div>
          <div className="modal-body text-center">
            <p>
              Attempting to refresh token...
            </p>
            <div className="spinner-border spinner-border-lg" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthDialog;
