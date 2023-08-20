import type { Meta, StoryObj } from '@storybook/react';

import * as Component from '.';

const meta: Meta<typeof Component.Root> = {
  component: Component.Root,
  args: {},
};

export default meta;
type Story = StoryObj<typeof Component.Root>;

export const SimpleAlert: Story = {
  args: {
    variant: 'danger',
  },
  render: ({ variant, ...args }) => (
    <Component.Root variant={variant} {...args}>
      <p>A simple {variant} alert—check it out!</p>
    </Component.Root>
  ),
};

export const AdditionalContent: Story = {
  ...SimpleAlert,
  render: ({ ...args }) => (
    <Component.Root {...args}>
      <Component.Title>Well done!</Component.Title>
      <Component.Body>
        <p>
          Aww yeah, you successfully read this important alert message. This
          example text is going to run a bit longer so that you can see how
          spacing within an alert works with this kind of content.
        </p>
        <hr />
        Whenever you need to, be sure to use margin utilities to keep things
        nice and tidy.
      </Component.Body>
    </Component.Root>
  ),
};

// export const Success: Story = {
//   ...Default,
//   args: {
//     variant: 'success',
//   },
// };

// export const Danger: Story = {
//   ...Default,
//   args: {
//     variant: 'danger',
//   },
// };
