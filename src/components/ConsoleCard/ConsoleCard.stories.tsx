import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
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

export default {
  title: 'components/ConsoleCard',
  component: ConsoleCard
} as ComponentMeta<typeof ConsoleCard>;

const Template: ComponentStory<typeof ConsoleCard> = (args) => <ConsoleCard {...args} />

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
  console
}
