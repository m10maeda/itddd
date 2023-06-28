const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  coverageDirectory: '../../coverage/apps/web',
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  reporters: process.env.CI
    ? [
        'default',
        [
          'jest-junit',
          {
            suiteName: 'web app unit tests',
            outputDirectory: '../../reports/apps/web',
            outputName: 'unit-test-results.xml',
          },
        ],
      ]
    : undefined,
};

module.exports = createJestConfig(config);
