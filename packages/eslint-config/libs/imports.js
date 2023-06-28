/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  rules: {
    // Prefer named export
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',

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
