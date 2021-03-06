import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  GamepadFrame,
  StreamState,
  StreamStateChangeEvent,
  VideoFrameEvent,
  VIDEO_CHANNEL
} from '@yowari/xremote';
import Player from '../../components/Player';
import { withAuthUser } from '../../hoc/withAuthUser';
import { withSourceBuffer } from '../../hoc/withSourceBuffer';
import { useClientContext } from '../../providers/client-provider';
import { useVideoSourceBufferContext } from '../../providers/video-source-buffer-provider';

function Session(): JSX.Element {
  const { sessionId } = useParams();

  const client = useClientContext();
  const { renderFrame, sourceBuffer } = useVideoSourceBufferContext();

  const [streamState, setStreamState] = useState<StreamState>();

  const onFrame = useCallback((frame: Event) => {
    renderFrame((frame as VideoFrameEvent).frame);
  }, [renderFrame]);

  const onStreamStateChange = useCallback((event: Event) => {
    setStreamState((event as StreamStateChangeEvent).state);
  }, []);

  const startStream = useCallback(async () => {
    client.addEventListener('streamstatechange', onStreamStateChange);

    await client.startStream(sessionId!);

    const videoChannel = client.getChannel(VIDEO_CHANNEL);
    videoChannel.addEventListener('frame', onFrame);
  }, [client, sessionId, onFrame, onStreamStateChange]);

  const stopStream = useCallback(() => {
    client.removeEventListener('streamstatechange', onStreamStateChange);

    const videoChannel = client.getChannel(VIDEO_CHANNEL);
    videoChannel.removeEventListener('frame', onFrame);

    client.stopStream();
  }, [client, onFrame, onStreamStateChange]);

  useEffect(() => {
    if (sourceBuffer) {
      startStream();
      return stopStream;
    }
  }, [startStream, stopStream, sourceBuffer]);

  const handleGamepadChange = (gamepad: GamepadFrame) => {
    const gamepadManager = client.getGamepadManager();
    gamepadManager.pushState(gamepad);
  };

  return (
    <div className="border">
      <Player streamState={streamState} onGamepadChange={handleGamepadChange} />
    </div>
  );
}

export default withAuthUser(withSourceBuffer(Session));
