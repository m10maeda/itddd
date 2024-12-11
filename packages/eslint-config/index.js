import globals from 'globals';

import typescript from './libs/typescript.js';
import node from './node.js';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export default [
  ...node,

  ...typescript.map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.mts', '**/*.cts'],
  })),

  {
    files: [
      '**/*.config.js',
      '**/*.config.cjs',
      '**/*.config.mjs',
      '**/*.config.ts',
      '**/*.config.cts',
      '**/*.config.mts',
    ],
    rules: {
      // Require default export.
      'import/prefer-default-export': 'error',
      'import/no-default-export': 'off',
    },
  },

  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
];
