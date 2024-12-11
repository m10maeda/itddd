import js from '@eslint/js';
import eslintConfigComments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import eslintConfigPrettier from 'eslint-config-prettier';
import onlyWarn from 'eslint-plugin-only-warn';
import promisePlugin from 'eslint-plugin-promise';
import regexPlugin from 'eslint-plugin-regexp';
import turboPlugin from 'eslint-plugin-turbo';
import globals from 'globals';

import _import from './libs/import.js';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export default [
  {
    ignores: ['dist/**', 'coverage/**'],
  },

  {
    plugins: { onlyWarn },
  },

  js.configs.recommended,

  _import,

  {
    files: ['**/*.config.js', '**/*.config.cjs', '**/*.config.mjs'],
    rules: {
      // Require default export.
      'import/prefer-default-export': 'error',
      'import/no-default-export': 'off',
    },
  },

  regexPlugin.configs['flat/recommended'],
  promisePlugin.configs['flat/recommended'],
  eslintConfigComments.recommended,
  turboPlugin.configs['flat/recommended'],

  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },

  eslintConfigPrettier,
];
