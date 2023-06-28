import { within, userEvent } from '@storybook/testing-library';

import { Button as Component } from './Button';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Component> = {
  component: Component,
  tags: ['autodocs'],
  args: {
    children: 'Button',
  },
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Primary: Story = {
  args: {},
};

export const Secondary: Story = {
  args: {},
};

export const Large: Story = {
  args: {
    // size: 'large',
  },
};

export const Small: Story = {
  args: {
    // size: 'small',
  },
};

export const Clicked: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button'));
  },
};
