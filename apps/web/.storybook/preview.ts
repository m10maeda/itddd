import { initialize, mswLoader } from 'msw-storybook-addon';

import type { Preview } from '@storybook/react';

import '../src/app/_layout/Layout/Reboot.scss';
import '../src/app/_typography/Typography.scss';

initialize();

const preview: Preview = {
  argTypes: {
    asChild: { control: false },
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  loaders: [mswLoader],
};

export default preview;
