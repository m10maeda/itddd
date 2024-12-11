import jestPlugin from 'eslint-plugin-jest';
import jestExtended from 'eslint-plugin-jest-extended';
import globals from 'globals';

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ...jestPlugin.configs['flat/recommended'],
    ...jestPlugin.configs['flat/style'],

    rules: {
      ...jestPlugin.configs['flat/recommended'].rules,
      ...jestPlugin.configs['flat/style'].rules,

      'jest/padding-around-after-all-blocks': 'error',
      'jest/padding-around-after-each-blocks': 'error',
      'jest/padding-around-before-all-blocks': 'error',
      'jest/padding-around-before-each-blocks': 'error',
      'jest/padding-around-describe-blocks': 'error',
      'jest/padding-around-test-blocks': 'error',
    },

    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },

  jestExtended.configs['flat/all'],
];
