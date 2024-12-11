import vitestPlugin from '@vitest/eslint-plugin';

/** @type {import("eslint").Linter.Config} */
export default {
  ...vitestPlugin.configs.recommended,
};
