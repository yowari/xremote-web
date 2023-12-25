export interface PlayerControlProps {
  isFullscreen?: boolean;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
  onFullscreen?: () => void;
}

function PlayerControl({
  isFullscreen = false,
  onMouseOver,
  onMouseLeave,
  onFullscreen
}: PlayerControlProps): JSX.Element {
  return (
    <div
     className="d-flex align-items-center p-2 bg-body border-bottom"
     style={{ opacity: '0.8' }}
     onMouseOver={onMouseOver}
     onMouseLeave={onMouseLeave}
     data-testid="playerControl-container"
    >
      <div className="flex-grow-1">
        <div className="h5 m-0">Xbox Stream</div>
      </div>
      <div>
        <button className="btn btn-primary" onClick={onFullscreen}>
          {isFullscreen
            ? <i className="bi bi-fullscreen-exit"></i>
            : <i className="bi bi-fullscreen"></i>
          }
          {' '}
          Fullscreen
        </button>
      </div>
    </div>
  );
}

export default PlayerControl;
