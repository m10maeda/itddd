import type { Config } from 'jest';

const config: Config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/e2e/'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: '../../coverage/apps/bff',
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  reporters: process.env.CI
    ? [
        'default',
        [
          'jest-junit',
          {
            suiteName: 'bff app unit tests',
            outputDirectory: '../../reports/apps/bff',
            outputName: 'unit-test-results.xml',
          },
        ],
      ]
    : undefined,
};

export default config;
