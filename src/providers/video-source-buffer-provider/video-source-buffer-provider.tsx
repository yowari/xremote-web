import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { Frame } from '@yowari/xremote';
import { useProviderContext } from '../../hooks/useProviderContext';

const VideoSourceBufferContext = createContext<{
  mediaSource: MediaSource;
  sourceBuffer?: SourceBuffer;
  renderFrame: (frame: Frame) => void;
} | undefined>(undefined);

export type VideoSourceBufferProviderProps = PropsWithChildren<{}>;

function VideoSourceBufferProvider({ children }: VideoSourceBufferProviderProps): JSX.Element {
  const [mediaSource] = useState<MediaSource>(new MediaSource());
  const frameQueue = useRef<Frame[]>([]);
  const [sourceBuffer, setSourceBuffer] = useState<SourceBuffer | null>(null);

  useEffect(() => {
    const onSourceOpen = () => {
      mediaSource.duration = Number.POSITIVE_INFINITY;

      const sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.4d0020"');
      sourceBuffer.mode = 'sequence';
      setSourceBuffer(sourceBuffer);
    }

    mediaSource.onsourceopen = onSourceOpen;
  }, [mediaSource]);

  const renderFrameQueue = useCallback(() => {
    const frameQueueSize = frameQueue.current.reduce((acc, frame) => acc + frame.data.byteLength, 0);

    const frameBuffer = new Uint8Array(frameQueueSize);
    let offset = 0;

    for (const frame of frameQueue.current) {
      frameBuffer.set(frame.data, offset);
      offset += frame.data.byteLength;
    }

    sourceBuffer?.appendBuffer(frameBuffer);
    frameQueue.current.splice(0, frameQueue.current.length);
  }, [sourceBuffer]);

  const renderFrame = useCallback((frame: Frame) => {
    frameQueue.current.push(frame);

    if (sourceBuffer) {
      if (!sourceBuffer.updating) {
        renderFrameQueue();
      }
    }
  }, [sourceBuffer, renderFrameQueue]);

  return (
    <VideoSourceBufferContext.Provider value={{ mediaSource, sourceBuffer: sourceBuffer || undefined, renderFrame }}>
      {children}
    </VideoSourceBufferContext.Provider>
  );
}

export const useVideoSourceBufferContext = () => useProviderContext(VideoSourceBufferContext, 'useVideoSourceBufferContext', 'VideoSourceBufferProvider');

export default VideoSourceBufferProvider;
