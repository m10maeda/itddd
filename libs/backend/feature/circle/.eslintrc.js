/** @type {import('eslint/lib/shared/types').ConfigData} */
const config = {
  extends: [
    '../../../../.eslintrc.json',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:jest-formatting/recommended',
  ],
  ignorePatterns: ['!**/*'],
  overrides: [
    {
      files: '*.ts',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig(.*)?.json'],
      },
      rules: {},
    },
  ],
};

module.exports = config;
