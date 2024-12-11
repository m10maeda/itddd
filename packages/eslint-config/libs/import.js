import { resolve } from 'node:path';

import importPlugin from 'eslint-plugin-import';

export const project = [resolve(process.cwd(), 'tsconfig.json')];

/** @type {import("eslint").Linter.Config} */
export default {
  ...importPlugin.flatConfigs.recommended,

  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },

  rules: {
    ...importPlugin.flatConfigs.recommended.rules,

    // Prefer named export.
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',

    'import/no-unresolved': ['error', { commonjs: true, caseSensitive: true }],

    // Enforce order and group imports.
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'object',
          'type',
          'index',
        ],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroups: [],
      },
    ],
  },
};
