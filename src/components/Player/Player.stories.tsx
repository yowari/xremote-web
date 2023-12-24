import type { Meta, StoryObj } from '@storybook/react';
import { StreamState } from '@yowari/xremote';
import Player from './Player';
import VideoSourceBufferProvider from '../../providers/video-source-buffer-provider';

const meta = {
  title: 'components/Player',
  component: Player,
  decorators: [
    (Story) => (
      <VideoSourceBufferProvider>
        <Story />
      </VideoSourceBufferProvider>
    )
  ],
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
} satisfies Meta<typeof Player>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
