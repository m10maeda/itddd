/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  extends: [
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:jest-formatting/recommended',
    'plugin:jest-extended/all',
  ],
  overrides: [
    {
      files: ['jest.config.@(ts|js)'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'import/prefer-default-export': 'error',
        'import/no-default-export': 'off',
      },
    },
  ],
};
