import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PlayerControl from './PlayerControl';

export default {
  title: 'components/Player/PlayerControl',
  component: PlayerControl
} as ComponentMeta<typeof PlayerControl>;

const Template: ComponentStory<typeof PlayerControl> = (args) => <PlayerControl {...args} />

export const Default = Template.bind({});
