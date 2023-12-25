import { StreamState } from '@yowari/xremote';

const streamStateText = {
  [StreamState.InitSession]: 'Initializing Session',
  [StreamState.InitWebrtc]: 'Initializing WebRTC',
  [StreamState.ConfigureSDP]: 'Configuring SDP',
  [StreamState.ConfigureICE]: 'Configuring ICE',
  [StreamState.Connected]: 'Successfully Connected'
};

const streamStateValue = {
  [StreamState.InitSession]: 0,
  [StreamState.InitWebrtc]: 25,
  [StreamState.ConfigureSDP]: 50,
  [StreamState.ConfigureICE]: 75,
  [StreamState.Connected]: 100
};

export interface PlayerLoadingProps {
  streamState: StreamState;
}

function PlayerLoading({ streamState }: PlayerLoadingProps): JSX.Element {
  return (
    <div className="bg-body text-center d-flex flex-column align-items-center w-100 h-100">
      <div className="my-auto">
        <div className="progress" style={{ width: '300px' }}>
          <div
           className="progress-bar progress-bar-striped progress-bar-animated"
           role="progressbar"
           aria-valuenow={streamStateValue[streamState]}
           aria-valuemin={0}
           aria-valuemax={100}
           style={{ width: streamStateValue[streamState] + '%' }}
          />
        </div>
        <div role="status">{streamStateText[streamState]}</div>
      </div>
    </div>
  );
}

export default PlayerLoading;
