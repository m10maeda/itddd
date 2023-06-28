/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:promise/recommended',
    'plugin:regexp/recommended',
    'plugin:eslint-comments/recommended',
    'turbo',
    './libs/variables.js',
    './libs/imports.js',
    'prettier',
  ],
  overrides: [
    {
      files: '**/*.ts',
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/strict',
        'airbnb-typescript/base',
        './libs/variables.js',
        './libs/imports.js',
        './libs/typescript.js',
        'prettier',
      ],
    },
  ],
};
