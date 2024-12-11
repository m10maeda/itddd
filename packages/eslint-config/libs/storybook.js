import storybookPlugin from 'eslint-plugin-storybook';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...storybookPlugin.configs['flat/recommended'],
  ...storybookPlugin.configs['flat/csf-strict'],

  {
    files: ['.storybook/*.ts', '**/*.stories.tsx'],
    rules: {
      // Require default export.
      'import/prefer-default-export': 'error',
      'import/no-default-export': 'off',
    },
  },
];
