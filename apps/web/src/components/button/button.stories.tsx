import { Fragment } from 'react';

import { Button as Component } from './button';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Component,
  tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link',
  },
};

export const Tags: Story = {
  render: () => (
    <div className="flex gap-2">
      <Component variant="primary">Button</Component>
      <Component variant="primary" as={Fragment}>
        <a href="https://example.com">Link</a>
      </Component>
    </div>
  ),
};
