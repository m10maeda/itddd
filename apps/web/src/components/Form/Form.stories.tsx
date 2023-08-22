import * as RadioGroup from './RadioGroup';
import { Button } from '../Button';

// import {
//   Default as DefaultControlStory,
//   Invalid as InvalidControlStory,
// } from './Control/Control.stories';
import type { Meta, StoryObj } from '@storybook/react';

import * as Component from '.';
// import {
//   Default as DefaultSelectStory,
//   Invalid as InvalidSelectStory,
// } from './Select/Select.stories';

const meta: Meta<typeof Component.Root> = {
  component: Component.Root,
  subcomponents: {
    // Button,
  },
  args: {},
  argTypes: {
    // children: { control: false },
    // onSubmit: { action: 'submitted' },
  },
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Default: Story = {
  render: (args) => (
    <Component.Root {...args}>
      <Component.Field>
        <Component.Label>Email address</Component.Label>
        <Component.Control type="email" required />

        <Component.Description>
          <p>Description text</p>
        </Component.Description>

        <Component.ErrorMessage>
          <p>Please enter your email</p>
        </Component.ErrorMessage>
      </Component.Field>

      <Component.Field>
        <Component.Label>Example textarea</Component.Label>
        <Component.Control asChild>
          <textarea />
        </Component.Control>

        <Component.ErrorMessage>
          <p>Please enter something text</p>
        </Component.ErrorMessage>
      </Component.Field>

      <Component.Field>
        <Component.Label>Example select</Component.Label>
        <Component.Control asChild>
          <select>
            <option value={1}>One</option>
            <option value={2}>Two</option>
            <option value={3}>Three</option>
          </select>
        </Component.Control>

        <Component.ErrorMessage>
          <p>Please select a valid state.</p>
        </Component.ErrorMessage>
      </Component.Field>

      <Component.Field fieldset>
        <Component.Label>Example radio group</Component.Label>

        <RadioGroup.Root>
          <RadioGroup.Item name="radio" value={1} defaultChecked>
            One
          </RadioGroup.Item>
          <RadioGroup.Item name="radio" value={2}>
            Two
          </RadioGroup.Item>
          <RadioGroup.Item name="radio" value={3}>
            One
          </RadioGroup.Item>
        </RadioGroup.Root>
      </Component.Field>

      <Component.Field fieldset>
        <Component.Label>Example checkboxe</Component.Label>

        <label>
          <input type="checkbox" />
          Check me out
        </label>
      </Component.Field>

      <div>
        <Button type="submit">Submit</Button>
      </div>
    </Component.Root>
  ),
};

export const ReadonlyPlainText: Story = {
  ...Default,
  render: (args) => (
    <Component.Root {...args}>
      <Component.Field>
        <Component.Label>Email address</Component.Label>
        <Component.Control plain value="alice@example.com" />
      </Component.Field>

      <Component.Field>
        <Component.Label>Example textarea</Component.Label>
        <Component.Control asChild plain>
          <textarea>Something text</textarea>
        </Component.Control>
      </Component.Field>

      <Component.Field>
        <Component.Label>Example select</Component.Label>
        <Component.Control plain value="Selected value" />
      </Component.Field>

      <Component.Field fieldset>
        <Component.Label>Example radio group</Component.Label>
        <Component.Control plain value="checked radio value" />
      </Component.Field>

      <Component.Field fieldset>
        <Component.Label>Example checkboxe</Component.Label>
        <Component.Control plain value="checked value" />
      </Component.Field>

      <div>
        <Button type="submit">Submit</Button>
      </div>
    </Component.Root>
  ),
};

export const MultipleField: Story = {
  ...Default,
  render: (args) => (
    <Component.Root {...args}>
      <Component.Field fieldset>
        <Component.Label>Name</Component.Label>

        <Component.Control
          type="text"
          required
          aria-label="first name"
          aria-errormessage="first-name-error-message"
        />

        <Component.Control
          type="text"
          required
          aria-label="last name"
          aria-errormessage="last-name-error-message"
        />

        <Component.ErrorMessage id="first-name-error-message">
          <p>Please enter your fiest name</p>
        </Component.ErrorMessage>

        <Component.ErrorMessage id="last-name-error-message">
          <p>Please enter your last name</p>
        </Component.ErrorMessage>
      </Component.Field>
    </Component.Root>
  ),
};
