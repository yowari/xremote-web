import { RefObject, useEffect } from 'react';
import { INPUT_CHANNEL, type Client } from '@yowari/xremote';

export function useFrameMetadataReport(client: Client, videoElementRef: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    let callbackHandle = 0;
    const videoElement = videoElementRef.current;

    // when no video element found return early
    if (!videoElement) {
      return;
    }

    const videoFrameLoop = (_now: DOMHighResTimeStamp, metadata: VideoFrameCallbackMetadata) => {
      const inputChannel = client.getChannel(INPUT_CHANNEL);

      const currentJitterBufferDelayMs = 0;

      const timeNow = performance.now();

      inputChannel.reportFrameMetadata({
        serverDataKey: metadata.rtpTimestamp as number,
        firstFramePacketArrivalTime: (metadata.receiveTime ?? 0) - currentJitterBufferDelayMs,
        frameSubmittedTime: metadata.receiveTime as number,
        frameDecodedTime: (metadata.receiveTime ?? 0) + 1000 * (metadata.processingDuration ?? 0),
        frameRenderedTime: metadata.expectedDisplayTime,
        framePacketTime: timeNow,
        frameDateNow: timeNow,
      });

      callbackHandle = videoElement.requestVideoFrameCallback(videoFrameLoop);
    };

    callbackHandle = videoElement.requestVideoFrameCallback(videoFrameLoop);

    return () => {
      if (callbackHandle && videoElement) {
        videoElement.cancelVideoFrameCallback(callbackHandle);
      }
    };
  }, [client, videoElementRef]);
}
