import { HomePage as Component } from './home-page';

import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: Component,
  tags: ['autodocs'],
  args: {
    children: 'Hello World!',
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HomePage: Story = {};
