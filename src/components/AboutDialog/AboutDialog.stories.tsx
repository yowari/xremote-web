import type { Meta, StoryObj } from '@storybook/react';
import AboutDialog from './AboutDialog';

const meta = {
  title: 'components/AboutDialog',
  component: AboutDialog
} satisfies Meta<typeof AboutDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    appName: 'Application Name',
    appVersion: '0.0.1'
  }
};
