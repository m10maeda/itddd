import config from './node.js';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...config,

  {
    rules: {
      // Prefer default export.
      'import/prefer-default-export': 'error',
      'import/no-default-export': 'off',
    },
  },
];
