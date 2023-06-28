import { within, userEvent } from '@storybook/testing-library';

import { IndexPage as Component } from './IndexPage';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Component> = {
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Component>;

export const IndexPage: Story = {};

export const Clicked: Story = {
  ...IndexPage,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button'));
  },
};
