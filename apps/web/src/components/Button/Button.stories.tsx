import { Button as Component } from './Button';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Component> = {
  component: Component,
  args: {
    children: 'Button',
    variant: 'primary',
  },
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Default: Story = {};

export const ButtonTags: Story = {
  ...Default,
  argTypes: {
    children: { control: false },
  },
  render: (args) => (
    <>
      <Component {...args}>Button</Component>{' '}
      <Component {...args} asChild>
        <a href="/">Link</a>
      </Component>{' '}
      <Component {...args} asChild>
        <input type="button" value="Input" />
      </Component>{' '}
      <Component {...args} asChild>
        <input type="submit" value="Submit" />
      </Component>{' '}
      <Component {...args} asChild>
        <input type="reset" value="Reset" />
      </Component>
    </>
  ),
};
