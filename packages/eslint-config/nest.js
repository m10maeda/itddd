/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  extends: ['./base.js', './+jest.js', 'prettier'],
  ignorePatterns: ['.eslintrc.js'],
  env: {
    node: true,
  },
  rules: {
    '@typescript-eslint/no-extraneous-class': [
      'error',
      {
        allowWithDecorator: true,
      },
    ],
  },
};
