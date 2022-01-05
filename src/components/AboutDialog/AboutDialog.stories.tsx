import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AboutDialog from './AboutDialog';

export default {
  title: 'components/AboutDialog',
  component: AboutDialog
} as ComponentMeta<typeof AboutDialog>;

const Template: ComponentStory<typeof AboutDialog> = (args) => <AboutDialog {...args} />

export const Default = Template.bind({});
Default.args = {
  ...Template.args,
  appName: 'Application Name',
  appVersion: '0.0.1'
}
