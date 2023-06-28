/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  root: true,
  extends: ['@itddd'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
};
