import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StreamState } from '@yowari/xremote';
import PlayerLoading from './PlayerLoading';

export default {
  title: 'components/Player/PlayerLoading',
  component: PlayerLoading,
  argTypes: {
    streamState: {
      control: {
        options: [
          StreamState.InitSession,
          StreamState.InitWebrtc,
          StreamState.ConfigureSDP,
          StreamState.ConfigureICE,
          StreamState.Connected
        ],
        type: 'radio',
        labels: {
          [StreamState.InitSession]: 'InitSession',
          [StreamState.InitWebrtc]: 'InitWebrtc',
          [StreamState.ConfigureSDP]: 'ConfigureSDP',
          [StreamState.ConfigureICE]: 'ConfigureICE',
          [StreamState.Connected]: 'Connected'
        }
      }
    }
  }
} as ComponentMeta<typeof PlayerLoading>;

const Template: ComponentStory<typeof PlayerLoading> = (args) => <PlayerLoading {...args} />

export const Default = Template.bind({});
Default.args = {
  ...Template.args,
  streamState: StreamState.InitSession
}
