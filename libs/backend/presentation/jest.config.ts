module.exports = {
  displayName: 'backend-presentation',
  preset: '../../../jest.preset.ts',
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
  coverageDirectory: '../../../coverage/libs/backend/presentation',
  reporters: process.env.CI
    ? [
        'default',
        [
          'jest-junit',
          {
            suiteName: 'backend unit tests',
            outputDirectory: 'reports/libs/backend/presentation',
            outputName: 'unit-test-results.xml',
          },
        ],
      ]
    : ['default'],
};
