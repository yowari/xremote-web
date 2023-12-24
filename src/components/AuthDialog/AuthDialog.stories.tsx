import type { Meta, StoryObj } from '@storybook/react';
import AuthDialog from './AuthDialog';

const meta = {
  title: 'components/AuthDialog',
  component: AuthDialog
} satisfies Meta<typeof AuthDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
