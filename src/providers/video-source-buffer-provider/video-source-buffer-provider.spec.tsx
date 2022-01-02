import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import VideoSourceBufferProvider, { useVideoSourceBufferContext } from './video-source-buffer-provider';

describe('VideoSourceBufferProvider', () => {
  const Component = () => <>Component Example</>;
  const sourceBufferMock = {
    mode: null,
    updating: false,
    appendBuffer: jest.fn()
  };
  const mediaSourceMock = {
    onsourceopen: null,
    addSourceBuffer: jest.fn()
  };
  const frame = { isKeyFrame: 0, data: new Uint8Array() };

  beforeAll(() => {
    Object.defineProperty(window, 'MediaSource', {
      writable: true,
      value: function () { return mediaSourceMock; }
    });
  });

  it('should display children', () => {
    render(
      <VideoSourceBufferProvider>
        <Component />
      </VideoSourceBufferProvider>
    );

    expect(screen.getByText(/Component Example/i)).toBeInTheDocument();
  });
  it('should create MediaSource and SourceBuffer', () => {
    const { result } = renderHook(() => useVideoSourceBufferContext(), { wrapper: VideoSourceBufferProvider });
    expect(result.current.mediaSource).toBeDefined();

    mediaSourceMock.addSourceBuffer.mockReturnValue(sourceBufferMock);
    act(() => (result.current.mediaSource as any).onsourceopen());
    expect(result.current.sourceBuffer).toBeDefined();
  });
  it('should render frame when SourceBuffer is not updating', () => {
    const { result } = renderHook(() => useVideoSourceBufferContext(), { wrapper: VideoSourceBufferProvider });
    expect(result.current.mediaSource).toBeDefined();

    mediaSourceMock.addSourceBuffer.mockReturnValue(sourceBufferMock);
    act(() => (result.current.mediaSource as any).onsourceopen());
    expect(result.current.sourceBuffer).toBeDefined();

    act(() => result.current.renderFrame(frame));
    expect(sourceBufferMock.appendBuffer).toHaveBeenCalledWith(frame.data);
  });

  it('should push the frame to frame queue when SourceBuffer is updating', () => {
    const { result } = renderHook(() => useVideoSourceBufferContext(), { wrapper: VideoSourceBufferProvider });
    expect(result.current.mediaSource).toBeDefined();

    mediaSourceMock.addSourceBuffer.mockReturnValue(sourceBufferMock);
    act(() => (result.current.mediaSource as any).onsourceopen());
    expect(result.current.sourceBuffer).toBeDefined();

    sourceBufferMock.updating = true;
    act(() => result.current.renderFrame(frame));
    expect(sourceBufferMock.appendBuffer).not.toHaveBeenCalled();
  });
});
