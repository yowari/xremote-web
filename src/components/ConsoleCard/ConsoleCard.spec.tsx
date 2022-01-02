import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { Console } from '@yowari/xremote';
import ConsoleCard from './ConsoleCard';
import userEvent from '@testing-library/user-event';

describe('ConsoleCard', () => {
  const console: Console = {
    consoleType: 'XboxOneS',
    deviceName: 'XBOXONE',
    isDevKit: false,
    outOfHomeWarning: false,
    playPath: 'v5/sessions/home/play',
    powerState: 'ConnectedStandby',
    serverId: 'ABCDEFGHIJKLMNOP',
    wirelessWarning: true
  };

  it('should render console informations', () => {
    render(<ConsoleCard console={console} />);

    const termList = screen.getByLabelText(/console informations/i);
    const terms = within(termList).getAllByRole('definition');
    const consoleInformations = terms.map(item => item.textContent);

    expect(screen.getByRole('heading')).toHaveTextContent(console.deviceName);
    expect(consoleInformations).toEqual([
      console.serverId,
      console.powerState,
    ]);
  });

  it('should show spinner and disable start button when loading', () => {
    render(<ConsoleCard console={console} loading />);

    const startStreamButton = screen.getByRole('button', { name: /Start Stream/i });

    expect(within(startStreamButton).getByRole('status')).toHaveTextContent('Loading...');
    expect(startStreamButton).toBeDisabled();
  });

  it('should call onStartStream when start stream button is clicked', () => {
    const handleStartStreamMock = jest.fn();

    render(<ConsoleCard console={console} onStartStream={handleStartStreamMock} />);

    const startStreamButton = screen.getByRole('button', { name: /Start Stream/i });
    userEvent.click(startStreamButton);

    expect(handleStartStreamMock).toHaveBeenCalledWith(console);
  });
});
