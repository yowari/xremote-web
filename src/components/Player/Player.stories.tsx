import React, { PropsWithChildren } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StreamState } from '@yowari/xremote';
import Player from './Player';
import VideoSourceBufferProvider, { useVideoSourceBufferContext } from '../../providers/video-source-buffer-provider';

type VideoFetchProps = PropsWithChildren<{}>;

function VideoFetch({children}: VideoFetchProps): JSX.Element {
  const { renderFrame } = useVideoSourceBufferContext();
  return (
    <>
      {children}
    </>
  );
};

export default {
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
} as ComponentMeta<typeof Player>;

const Template: ComponentStory<typeof Player> = (args) => <Player {...args} />

export const Default = Template.bind({});
