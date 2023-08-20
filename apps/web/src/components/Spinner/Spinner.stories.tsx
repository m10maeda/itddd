import type { Meta, StoryObj } from '@storybook/react';

import { Spinner as Component } from '.';

const meta: Meta<typeof Component> = {
  component: Component,
  args: {},
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Spinner: Story = {};
