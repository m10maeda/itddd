/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  root: true,
  extends: ['@itddd'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: '*.d.ts',
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: 'turbo/**/*.ts',
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'import/no-default-export': 'off',
      },
    },
  ],
};
