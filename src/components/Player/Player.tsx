import React, { useEffect, useRef, useState } from 'react';
import { GamepadFrame, StreamState } from '@yowari/xremote';
import PlayerLoading from './PlayerLoading';
import PlayerControl from './PlayerControl';
import { useVideoSourceBufferContext } from '../../providers/video-source-buffer-provider';
import { useGamepad } from '../../hooks/useGamepad';

const PLAYER_CONTROL_DISPLAY_DELAY = 1000;

export interface PlayerProps {
  streamState?: StreamState;
  onGamepadChange?: (gamepad: GamepadFrame) => void
}

function Player({ streamState, onGamepadChange }: PlayerProps): JSX.Element {
  const { mediaSource, sourceBuffer } = useVideoSourceBufferContext();

  const [showControl, setShowControl] = useState<boolean>(true);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  const videoHolderRef = useRef<HTMLDivElement | null>(null);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const mouseOverControl = useRef<boolean>(false);
  const showControlTimeout = useRef<number>(0);

  useGamepad(onGamepadChange);

  useEffect(() => {
    if (sourceBuffer) {
      const onUpdateEnd = () => {
        if (videoElementRef.current?.paused) {
          videoElementRef.current.currentTime = sourceBuffer.buffered.length > 0 ? sourceBuffer.buffered.end(sourceBuffer.buffered.length - 1) : 0
          videoElementRef.current.play();
        }
      };
      sourceBuffer.addEventListener('updateend', onUpdateEnd);
      return () => sourceBuffer.removeEventListener('updateend', onUpdateEnd);
    }
  }, [sourceBuffer]);

  useEffect(() => {
    if (!mediaSource) {
      throw new Error('Cannot initialize Player');
    }

    if ('srcObject' in videoElementRef.current!) {
      try {
        videoElementRef.current!.srcObject = mediaSource;
      } catch (e) {
        videoElementRef.current!.src = window.URL.createObjectURL(mediaSource);
      }
    } else {
      videoElementRef.current!.src = window.URL.createObjectURL(mediaSource);
    }
    videoElementRef.current!.load();
  }, [mediaSource]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setFullscreen(!fullscreen);
    }

    videoHolderRef.current!.onfullscreenchange = onFullscreenChange;
    (videoHolderRef.current as any).onwebkitfullscreenchange = onFullscreenChange;
  }, [fullscreen]);

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

  const handleFullscreen = async () => {
    if (!fullscreen) {
      const requestFullscreen = videoHolderRef.current?.requestFullscreen || (videoHolderRef.current as any).webkitRequestFullscreen;
      await requestFullscreen.call(videoHolderRef.current);
    } else {
      const exitFullscreen = document.exitFullscreen || (document as any).webkitExitFullscreen;
      await exitFullscreen.call(document);
    }
  };

  const handleRequestPointerLock = () => {
    videoElementRef.current?.requestPointerLock();
  }

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

  return (
    <div
     style={{ position: 'relative', background: 'black' }}
     ref={videoHolderRef}
     onMouseMove={handleControlMouseMove}
    >
      <video
       className="w-100 h-100"
       ref={videoElementRef}
       onClick={handleRequestPointerLock}
       autoPlay={true}
       loop={false}
      ></video>
      {typeof streamState !== 'undefined' && streamState !== StreamState.Connected &&
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <PlayerLoading streamState={streamState} />
        </div>
      }
      {showControl &&
        <div className="w-100" style={{ position: 'absolute', top: 0 }}>
          <PlayerControl
            isFullscreen={fullscreen}
            onMouseOver={handleControlMouseOver}
            onMouseLeave={handleControlMouseLeave}
            onFullscreen={handleFullscreen}
          />
        </div>
      }
    </div>
  );
}

export default Player;
