import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';

import * as stories from './Button.stories';

describe('Button', () => {
  const { Primary } = composeStories(stories);

  it('should render successfully', () => {
    const { baseElement } = render(<Primary />);

    expect(baseElement).toBeTruthy();
  });
});
