module.exports = {
  displayName: 'backend-feature-user',
  preset: '../../../../jest.preset.ts',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../../coverage/libs/backend/feature/user',
  reporters: process.env.CI
    ? [
        'default',
        [
          'jest-junit',
          {
            suiteName: 'backend unit tests',
            outputDirectory: 'reports/libs/backend/feature/user',
            outputName: 'unit-test-results.xml',
          },
        ],
      ]
    : ['default'],
};
