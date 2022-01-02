import React, { ComponentType } from 'react';
import VideoSourceBufferProvider from '../providers/video-source-buffer-provider';

export const withSourceBuffer = <P extends object>(Component: ComponentType<P>) => (props: P) => {
  return (
    <VideoSourceBufferProvider>
      <Component {...props} />
    </VideoSourceBufferProvider>
  );
};
