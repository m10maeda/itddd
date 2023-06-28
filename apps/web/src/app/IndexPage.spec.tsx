import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';

import * as stories from './IndexPage.stories';

describe('/', () => {
  const { IndexPage } = composeStories(stories);

  it('should render successfully', () => {
    const { baseElement } = render(<IndexPage />);

    expect(baseElement).toBeTruthy();
  });
});
