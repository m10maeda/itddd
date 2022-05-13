module.exports = {
  displayName: 'backend-feature-circle',
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
  coverageDirectory: '../../../../coverage/libs/backend/feature/circle',
  reporters: process.env.CI
    ? [
        'default',
        [
          'jest-junit',
          {
            suiteName: 'backend unit tests',
            outputDirectory: 'reports/libs/backend/feature/circle',
            outputName: 'unit-test-results.xml',
          },
        ],
      ]
    : ['default'],
};
