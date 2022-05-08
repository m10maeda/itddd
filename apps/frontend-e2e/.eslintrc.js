/** @type {import('eslint/lib/shared/types').ConfigData} */
const config = {
  extends: [
    '../../.eslintrc.json',
    'plugin:cypress/recommended',
    'plugin:mocha/recommended',
  ],
  ignorePatterns: ['!**/*'],
  rules: {
    // Passing arrow functions (aka “lambdas”) to Mocha is discouraged.
    // https://mochajs.org/#arrow-functions
    'prefer-arrow-callback': 'off',
    'func-names': ['error', 'never'],
  },
  overrides: [
    {
      files: '*.ts',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig(.*)?.json'],
      },
      rules: {},
    },
    {
      files: ['src/plugins/index.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'no-undef': 'off',
      },
    },
  ],
};

module.exports = config;
