const nextJest = require('next/jest');

const createJestConfig = nextJest();

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  coverageDirectory: '../../coverage/packages/ui',
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  reporters: process.env.CI
    ? [
        'default',
        [
          'jest-junit',
          {
            suiteName: 'ui library unit tests',
            outputDirectory: '../../reports/packages/ui',
            outputName: 'unit-test-results.xml',
          },
        ],
      ]
    : undefined,
};

module.exports = createJestConfig(config);
