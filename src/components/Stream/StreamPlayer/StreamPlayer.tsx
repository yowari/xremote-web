import { useRef } from 'react';
import { Client } from '@yowari/xremote';
import { useClientMediaTrack } from './useClientMediaTrack';
import { useFrameMetadataReport } from './useFrameMetadataReport';

export type StreamPlayer = {
  client: Client;
}

export default function StreamPlayer({ client }: StreamPlayer) {
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  useClientMediaTrack(client, videoElementRef, audioElementRef);
  useFrameMetadataReport(client, videoElementRef);

  return (
    <>
      <video
        className="w-100 h-100"
        ref={videoElementRef}
        autoPlay={true}
        loop={false}
      ></video>
      <audio
        className="hidden"
        ref={audioElementRef}
        autoPlay={true}
      ></audio>
    </>
  );
}
