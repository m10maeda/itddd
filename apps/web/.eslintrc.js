/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  root: true,
  extends: ['@itddd'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['**/__generated__/**/*.ts'],
  overrides: [
    {
      files: [
        '**/app/**/@(page|layout|template|loading|error|global-error|no-found).tsx',
      ],
      rules: {
        'import/prefer-default-export': 'error',
        'import/no-default-export': 'off',
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
