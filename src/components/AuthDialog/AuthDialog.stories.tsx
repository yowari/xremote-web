import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AuthDialog from './AuthDialog';

export default {
  title: 'components/AuthDialog',
  component: AuthDialog
} as ComponentMeta<typeof AuthDialog>;

const Template: ComponentStory<typeof AuthDialog> = (args) => <AuthDialog />

export const Default = Template.bind({});
