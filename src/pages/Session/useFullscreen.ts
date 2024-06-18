import { RefObject, useEffect, useState } from 'react';

export function useFullscreen(videoHolderRef: RefObject<HTMLElement | null>) {
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  useEffect(() => {
    if (!videoHolderRef.current) {
      return;
    }

    const onFullscreenChange = () => {
      setFullscreen(!fullscreen);
    }

    videoHolderRef.current.onfullscreenchange = onFullscreenChange;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (videoHolderRef.current as any).onwebkitfullscreenchange = onFullscreenChange;
  }, [fullscreen, videoHolderRef]);

  const handleFullscreen = async () => {
    if (!fullscreen) {
      const requestFullscreen = videoHolderRef.current?.requestFullscreen || (videoHolderRef.current as any).webkitRequestFullscreen;
      await requestFullscreen.call(videoHolderRef.current);
    } else {
      const exitFullscreen = document.exitFullscreen || (document as any).webkitExitFullscreen;
      await exitFullscreen.call(document);
    }
  };

  return { fullscreen, handleFullscreen };
}
