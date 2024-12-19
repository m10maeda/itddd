import config from '@itddd/eslint-config/node';

/** @type {import("eslint").Linter.Config[]} */
export default [{ ignores: ['src'] }, ...config];
