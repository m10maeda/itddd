import config from '@itddd/eslint-config';
import playwright from 'eslint-plugin-playwright';

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: ['node_modules', 'playwright-report'],
  },
  ...config,
  playwright.configs['flat/recommended'],
];
