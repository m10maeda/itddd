/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  root: true,
  extends: ['@itddd'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['**/__generated__/**/*.ts', 'public/mockServiceWorker.js'],
  overrides: [
    {
      files: [
        'src/app/**/@(page|layout|template|loading|error|global-error|not-found).tsx',
        'src/app/**/@(page|layout|template|loading|error|global-error|not-found)/index.tsx',
      ],
      rules: {
        'import/prefer-default-export': 'error',
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['src/components/**/*.tsx'],
      rules: {
        'react/jsx-props-no-spreading': 'off',
      },
    },
    {
      files: ['codegen.ts'],
      rules: {
        'import/prefer-default-export': 'error',
        'import/no-default-export': 'off',
      },
    },
  ],
};
