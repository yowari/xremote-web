import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import type { Console } from '@yowari/xremote';
import ConsoleCard from './ConsoleCard';

const console = {
  consoleType: 'XboxOneS',
  deviceName: 'XBOXONE',
  isDevKit: false,
  outOfHomeWarning: false,
  playPath: 'v5/sessions/home/play',
  powerState: 'ConnectedStandby',
  serverId: 'ABCDEFGHIJKLMNOP',
  wirelessWarning: true
} satisfies Console;

describe('ConsoleCard', () => {
  it('should display the console name and status', () => {
    const router = createMemoryRouter([
      {
        path: '/',
        element: <ConsoleCard console={console} />,
      }
    ]);

    render(<RouterProvider router={router} />);

    expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent(console.deviceName);
    expect(screen.getByText('Standby')).toBeInTheDocument();
  });
});
