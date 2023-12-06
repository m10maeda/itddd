import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';

import * as stories from './HomePage.stories';

describe('/', () => {
  const { HomePage } = composeStories(stories);

  it('should render successfully', () => {
    const { baseElement } = render(<HomePage />);

    expect(baseElement).toBeTruthy();
  });
});
