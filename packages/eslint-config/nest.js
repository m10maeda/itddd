import base from './index.js';

/**
 * A custom ESLint configuration for libraries that use NestJS.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export default [
  ...base,

  {
    files: ['**/*.module.ts'],
    rules: {
      '@typescript-eslint/no-extraneous-class': [
        'error',
        {
          allowWithDecorator: true,
        },
      ],
    },
  },
];
