import type { Config } from 'jest';

const config: Config = {
  rootDir: '.',
  setupFilesAfterEnv: ['<rootDir>/../jest.setup.ts'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};

export default config;
