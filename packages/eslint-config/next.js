import nextPlugin from '@next/eslint-plugin-next';
import testingLibraryPlugin from 'eslint-plugin-testing-library';

import jsxA11y from './libs/jsx-a11y.js';
import reactHooks from './libs/react-hooks.js';
import react from './libs/react.js';
import storybook from './libs/storybook.js';
import typescript from './libs/typescript.js';
import vitest from './libs/vitest.js';
import node from './node.js';

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export default [
  {
    ignores: ['.next/**'],
  },

  ...node,

  ...typescript.map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
  })),

  {
    files: [
      '**/*.config.js',
      '**/*.config.cjs',
      '**/*.config.mjs',
      '**/*.config.ts',
      '**/*.config.cts',
      '**/*.config.mts',
    ],
    rules: {
      // Require default export.
      'import/prefer-default-export': 'error',
      'import/no-default-export': 'off',
    },
  },

  jsxA11y,
  react,
  reactHooks,

  ...storybook,

  vitest,
  testingLibraryPlugin.configs['flat/react'],

  {
    files: ['**/*.tsx'],
    rules: {
      // Prefer using `type`s for object type definitions.
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    },
  },

  {
    ...nextPlugin.configs.recommended,
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },

  {
    files: [
      '**/default.tsx',
      '**/page.tsx',
      '**/template.tsx',
      '**/layout.tsx',
      '**/error.tsx',
      '**/not-found.tsx',
      '**/loading.tsx',
      'app/global-error.tsx',
      'app/sitemap.ts',
      'app/robots.ts',
    ],
    rules: {
      // Require default export.
      'import/prefer-default-export': 'error',
      'import/no-default-export': 'off',
    },
  },
];
