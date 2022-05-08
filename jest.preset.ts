const nxPreset = require('@nrwl/jest/preset');

module.exports = {
  ...nxPreset,
  coverageReporters: process.env.CI ? ['lcov'] : nxPreset.coverageReporters,
};
