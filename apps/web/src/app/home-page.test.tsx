import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import * as stories from './home-page.stories';

test('HomePage', () => {
  const { HomePage } = composeStories(stories);

  render(<HomePage />);

  expect(screen.getByText('Hello World!')).toBeDefined();
});
