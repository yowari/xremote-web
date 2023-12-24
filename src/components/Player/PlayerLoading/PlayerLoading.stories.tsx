import type { Meta, StoryObj } from '@storybook/react';
import { StreamState } from '@yowari/xremote';
import PlayerLoading from './PlayerLoading';

const meta = {
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
} satisfies Meta<typeof PlayerLoading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    streamState: StreamState.InitSession
  }
};
