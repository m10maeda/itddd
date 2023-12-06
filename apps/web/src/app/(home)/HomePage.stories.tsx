import { within, userEvent } from '@storybook/testing-library';

import { HomePage as Component } from './HomePage';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Component>;

export const HomePage: Story = {};

export const Clicked: Story = {
  ...HomePage,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button'));
  },
};
