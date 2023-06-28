import type { Config } from 'jest';

const config: Config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/e2e/'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: '../../coverage/apps/backend',
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  reporters: process.env.CI
    ? [
        'default',
        [
          'jest-junit',
          {
            suiteName: 'backend app unit tests',
            outputDirectory: '../../reports/apps/backend',
            outputName: 'unit-test-results.xml',
          },
        ],
      ]
    : undefined,
};

export default config;
