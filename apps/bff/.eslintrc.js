/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  root: true,
  extends: ['@itddd/eslint-config/nest'],
  ignorePatterns: ['dist'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: ['e2e/**/*.ts'],
      rules: {
        'jest/expect-expect': [
          'error',
          { assertFunctionNames: ['expect', 'request.**.expect'] },
        ],
      },
    },
  ],
};
