import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from '../../utils/client';
import classes from './Session.module.css';
import { useFullscreen } from './useFullscreen';
import StreamPlayer from '../../components/Stream/StreamPlayer';
import StreamLoading from '../../components/Stream/StreamLoading';
import StreamControlBar from '../../components/Stream/StreamControlBar';

const PLAYER_CONTROL_DISPLAY_DELAY = 1000;

function useStreamControlBarDisplay() {
  const [showControl, setShowControl] = useState<boolean>(true);

  const mouseOverControl = useRef<boolean>(false);
  const showControlTimeout = useRef<number>(0);

  const hideControlAfterTimeout = () => {
    if (showControlTimeout.current) {
      window.clearTimeout(showControlTimeout.current);
    }

    showControlTimeout.current = window.setTimeout(() => {
      if (!mouseOverControl.current) {
        setShowControl(false);
      }
      showControlTimeout.current = 0;
    }, PLAYER_CONTROL_DISPLAY_DELAY);
  };

  const handleControlMouseMove = () => {
    setShowControl(true);
    hideControlAfterTimeout();
  };

  const handleControlMouseOver = () => {
    mouseOverControl.current = true;
    setShowControl(true);
  };

  const handleControlMouseLeave = () => {
    mouseOverControl.current = false;
    hideControlAfterTimeout();
  };

  return {
    showControl,
    handleControlMouseMove,
    handleControlMouseOver,
    handleControlMouseLeave,
  };
}

export default function Session() {
  const { sessionId } = useParams();
  const [client] = useState(() => createClient());
  const videoHolderRef = useRef<HTMLDivElement | null>(null);
  const { fullscreen, handleFullscreen } = useFullscreen(videoHolderRef);
  const {
    showControl,
    handleControlMouseLeave,
    handleControlMouseMove,
    handleControlMouseOver,
  } = useStreamControlBarDisplay();

  useEffect(() => {
    client.startStream(sessionId!);
    return () => client.stopStream();
  }, [client, sessionId]);

  return (
    <div className={classes.container} ref={videoHolderRef} onMouseMove={handleControlMouseMove}>
      <StreamPlayer client={client} />
      <StreamControlBar
        showControl={showControl}
        isFullscreen={fullscreen}
        onFullscreen={handleFullscreen}
        onMouseLeave={handleControlMouseLeave}
        onMouseOver={handleControlMouseOver}
      />
      <StreamLoading client={client} />
    </div>
  );
}
