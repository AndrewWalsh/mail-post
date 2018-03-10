const base = require('./jest.config.base.js');

module.exports = Object.assign(
  {},
  base,
  {
    globalSetup: './electron.globalSetup.js',
    setupFiles: [
      '../internals/scripts/CheckBuiltsExist.js',
    ],
  },
);
