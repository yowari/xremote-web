import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import About from './About';

export default {
  title: 'components/About',
  component: About
} as ComponentMeta<typeof About>;

const Template: ComponentStory<typeof About> = (args) => <About {...args} />

export const Default = Template.bind({});
Default.args = {
  ...Template.args,
  appName: 'Application Name',
  appVersion: '0.0.1'
}
