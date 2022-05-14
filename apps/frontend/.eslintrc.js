/** @type {import('eslint/lib/shared/types').ConfigData} */
const config = {
  extends: [
    'plugin:@nrwl/nx/react-typescript',
    '../../.eslintrc.json',
    'airbnb',
    'airbnb/hooks',
    'plugin:@next/next/core-web-vitals',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:jest-formatting/recommended',
    'plugin:testing-library/react',
    'prettier',
  ],
  ignorePatterns: ['!**/*'],
  rules: {
    'react/react-in-jsx-scope': 'off',

    // Enforce arrow function component
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],

    'react/prop-types': 'off',

    'react/require-default-props': 'off',

    'jsx-a11y/alt-text': [
      'error',
      {
        elements: ['img', 'object', 'area', 'input[type="image"]'],
        img: ['Image'],
        object: [],
        area: [],
        'input[type="image"]': [],
      },
    ],

    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'either',
      },
    ],

    '@next/next/no-html-link-for-pages': ['error', 'apps/frontend/pages'],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig(.*)?.json'],
      },
      extends: ['airbnb-typescript', 'prettier'],
    },
    {
      files: ['*.tsx'],
      rules: {
        'import/no-named-as-default': 'off',
      },
    },
  ],
};

module.exports = config;
