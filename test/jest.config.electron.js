const base = require('./jest.config.base.js');

module.exports = Object.assign(
  {},
  base,
  {
    setupTestFrameworkScriptFile: './electron.setupTestFrameworkScriptFile.js',
    globalSetup: './electron.globalSetup.js',
    setupFiles: [
      '../internals/scripts/CheckBuiltsExist.js',
    ],
  },
);
