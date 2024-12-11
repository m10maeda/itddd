import nodeConfig from '@itddd/eslint-config/node';

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: ['packages/**', 'apps/**'],
  },

  ...nodeConfig,
];
