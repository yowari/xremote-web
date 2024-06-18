import { useEffect, useState } from 'react';
import { Client, StreamState, StreamStateChangeEvent } from '@yowari/xremote';

const STREAM_STATE_TEXTS = {
  [StreamState.InitSession]: 'Initializing Session',
  [StreamState.InitWebrtc]: 'Initializing WebRTC',
  [StreamState.ConfigureSDP]: 'Configuring SDP',
  [StreamState.ConfigureICE]: 'Configuring ICE',
  [StreamState.Connected]: 'Successfully Connected'
};

const STREAM_STATE_VALUES = {
  [StreamState.InitSession]: 0,
  [StreamState.InitWebrtc]: 25,
  [StreamState.ConfigureSDP]: 50,
  [StreamState.ConfigureICE]: 75,
  [StreamState.Connected]: 100
};

type StreamLoadingProps = {
  client: Client;
}

export default function StreamLoading({ client }: StreamLoadingProps) {
  const [streamState, setStreamState] = useState<StreamState | undefined>();

  useEffect(() => {
    const onStreamStateChange = (event: Event) => {
      console.log('streamstatechange', (event as StreamStateChangeEvent).state);
      setStreamState((event as StreamStateChangeEvent).state);
    };

    client.addEventListener('streamstatechange', onStreamStateChange);

    return () => {
      client.removeEventListener('streamstatechange', onStreamStateChange);
    };
  }, [client]);

  return (
    <>
      {typeof streamState !== 'undefined' && streamState !== StreamState.Connected && (
        <div className="bg-body text-center d-flex flex-column align-items-center w-100 h-100 position-absolute top-0 bottom-0 start-0 end-0">
          <div className="my-auto">
            <div className="progress" style={{ width: '300px' }}>
              <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              aria-valuenow={STREAM_STATE_VALUES[streamState]}
              aria-valuemin={0}
              aria-valuemax={100}
              style={{ width: STREAM_STATE_VALUES[streamState] + '%' }}
              />
            </div>
            <div role="status">{STREAM_STATE_TEXTS[streamState]}</div>
          </div>
        </div>
      )}
    </>
  );
}
