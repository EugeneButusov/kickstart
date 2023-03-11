const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
  ...nxPreset,
  testMatch: ['**/+(*.|*.e2e-)+(spec|test).+(ts|js)?(x)'],
};
