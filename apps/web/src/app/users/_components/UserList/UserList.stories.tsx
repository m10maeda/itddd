import { UserList as Component } from './UserList';

import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Component,
  argTypes: {
    users: {
      table: { disable: true },
    },
  },
} as Meta<typeof Component>;

export const Filled: StoryObj<typeof Component> = {
  args: {
    users: [
      { id: '0', name: 'Alice', type: 'Premium' },
      { id: '1', name: 'Bob', type: 'Normal' },
      { id: '2', name: 'Carol', type: 'Premium' },
      { id: '3', name: 'Dave', type: 'Normal' },
      { id: '4', name: 'Elen', type: 'Normal' },
      { id: '5', name: 'Frank', type: 'Normal' },
      { id: '6', name: 'Isaac', type: 'Normal' },
      { id: '7', name: 'Justin', type: 'Normal' },
      { id: '8', name: 'Mallory', type: 'Normal' },
      { id: '9', name: 'Oscar', type: 'Normal' },
    ],
  },
};

export const Empty: StoryObj<typeof Component> = {
  args: {
    users: [],
  },
};
