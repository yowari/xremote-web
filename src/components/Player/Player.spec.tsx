import { render } from '@testing-library/react';
import Player from './Player';
import VideoSourceBufferProvider from '../../providers/video-source-buffer-provider';

describe.skip('Player', () => {
  it('should render correctly', () => {
    render(<Player />, { wrapper: VideoSourceBufferProvider });
  });
});
