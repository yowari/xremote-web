import React from 'react';
import { render, screen } from '@testing-library/react';
import { StreamState } from '@yowari/xremote';
import PlayerLoading from './PlayerLoading';

describe('PlayerLoading', () => {
  it.each([
    [StreamState.InitSession, 'Initializing Session', 0],
    [StreamState.InitWebrtc, 'Initializing WebRTC', 25],
    [StreamState.ConfigureSDP, 'Configuring SDP', 50],
    [StreamState.ConfigureICE, 'Configuring ICE', 75],
    [StreamState.Connected, 'Successfully Connected', 100]
  ])('should render loading status', (streamState, streamStateText, streamStateValue) => {
    render(<PlayerLoading streamState={streamState} />);
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toEqual(`${streamStateValue}`);
    expect(screen.getByRole('status')).toHaveTextContent(streamStateText);
  });
});
