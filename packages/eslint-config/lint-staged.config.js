export default {
  'package.json': ['prettier --write', 'sort-package-json'],
  '{!(package).json,*.{md,yml,yaml}}': 'prettier --write',
  '*.{ts,js,cjs,mjs}': [
    'prettier --write',
    'eslint --fix --cache --max-warnings 0',
  ],
};
