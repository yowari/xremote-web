import clsx from 'clsx';

type StreamControlBarProps = {
  isFullscreen?: boolean;
  showControl?: boolean;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
  onFullscreen?: () => void;
};

export default function StreamControlBar({ isFullscreen, showControl, onMouseOver, onMouseLeave, onFullscreen }: StreamControlBarProps) {
  return (
    <div
     className={clsx('d-flex align-items-center p-2 bg-body border-bottom position-absolute top-0 w-100', { 'd-none': !showControl })}
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
