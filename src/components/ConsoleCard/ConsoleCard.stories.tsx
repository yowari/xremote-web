import type { Meta, StoryObj } from '@storybook/react';
import { Console } from '@yowari/xremote';
import ConsoleCard from './ConsoleCard';

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

const meta = {
  title: 'components/ConsoleCard',
  component: ConsoleCard
} satisfies Meta<typeof ConsoleCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    console
  }
};
