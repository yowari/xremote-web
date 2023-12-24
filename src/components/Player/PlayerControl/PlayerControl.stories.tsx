import type { Meta, StoryObj } from '@storybook/react';
import PlayerControl from './PlayerControl';

const meta = {
  title: 'components/Player/PlayerControl',
  component: PlayerControl
} satisfies Meta<typeof PlayerControl>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
