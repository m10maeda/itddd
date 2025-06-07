import config from '@itddd/eslint-config';
import vitest from '@itddd/eslint-config/+vitest';

/** @type {import("eslint").Linter.Config[]} */
export default [...config, ...vitest];
