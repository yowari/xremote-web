import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Toast from './Toast';

export default {
  title: 'components/Toast',
  component: Toast
} as ComponentMeta<typeof Toast>;

const Template: ComponentStory<typeof Toast> = (args) => <Toast {...args} />

export const Default = Template.bind({});
Default.args = {
  ...Default.args,
  title: 'Toast Title',
  content: 'This is a toast content example text.'
};
