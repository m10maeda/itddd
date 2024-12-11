import path from 'node:path';

const buildEslintCommand = (filenames) =>
  `next lint --max-warnings 0 --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

export default {
  'package.json': ['prettier --write', 'sort-package-json'],
  '{!(package).json,*.{md,yml,yaml}}': 'prettier --write',
  '*.{tsx,ts,js,cjs,mjs}': ['prettier --write', buildEslintCommand],
};
