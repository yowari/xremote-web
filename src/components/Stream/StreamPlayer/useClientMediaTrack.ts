import { useEffect, type RefObject } from 'react';
import type { AudioTrackEvent, Client, VideoTrackEvent } from '@yowari/xremote';

export function useClientMediaTrack(client: Client, videoElementRef: RefObject<HTMLVideoElement | null>, audioElementRef: RefObject<HTMLAudioElement | null>) {
  useEffect(() => {
    const videoElement = videoElementRef.current;
    const audioElement = audioElementRef.current;

    // when no video or audio element found return early
    if (!videoElement || !audioElement) {
      return;
    }

    const onVideoTrack = (event: Event) => {
      videoElement.srcObject = (event as VideoTrackEvent).track;
    };

    const onAudioTrack = (event: Event) => {
      audioElement.srcObject = (event as AudioTrackEvent).track;
    };

    client.addEventListener('videotrack', onVideoTrack);
    client.addEventListener('audiotrack', onAudioTrack);

    return () => {
      client.removeEventListener('videotrack', onVideoTrack);
      client.removeEventListener('audiotrack', onAudioTrack);
    };
  }, [audioElementRef, client, videoElementRef]);
}
