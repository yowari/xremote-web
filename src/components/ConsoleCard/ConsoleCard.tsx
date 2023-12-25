import { Console } from '@yowari/xremote';

export interface ConsoleCardProps {
  console: Console;
  loading?: boolean;
  onStartStream?: (console: Console) => void;
}

function ConsoleCard({ console, loading, onStartStream }: ConsoleCardProps): JSX.Element {
  const handleStartStream = () => {
    onStartStream?.(console);
  }

  return (
    <div className="p-4 my-2 bg-white border rounded-3">
      <div className="d-flex align-items-center mb-2">
        <h3 className="flex-grow-1 m-0">{console.deviceName}</h3>
        <button className="btn btn-success" onClick={handleStartStream} disabled={loading}>
          {loading
            ? <>
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </>
            : <i className="bi bi-play-fill"></i>
          }
          {' '}Start Stream
        </button>
      </div>

      <dl className="list-group list-group-flush text-muted" aria-label="Console Informations">
        <div className="list-group-item d-flex justify-content-between align-items-center">
          <dt className="fw-normal">Server ID</dt>
          <dd className="m-0">{console.serverId}</dd>
        </div>
        <div className="list-group-item d-flex justify-content-between align-items-center">
          <dt className="fw-normal">Power State</dt>
          <dd className="m-0">{console.powerState}</dd>
        </div>
      </dl>
    </div>
  );
}

export default ConsoleCard;
