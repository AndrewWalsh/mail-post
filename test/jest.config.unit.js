const base = require('./jest.config.base.js');

module.exports = Object.assign(
  {},
  base,
  {
    setupTestFrameworkScriptFile: './test/unit.setupTestFrameworkScriptFile.js',
    rootDir: '../',
    transform: {
      '^.+\\.jsx$': 'babel-jest',
      '^.+\\.js$': 'babel-jest',
    },
    snapshotSerializers: [
      'enzyme-to-json/serializer',
    ],
    collectCoverageFrom: [
      // Renderer files
      'app/renderer/**/*.js',
      // Worker files
      'app/worker/**/*.js',
      // Ignore
      '!**/dist/**',
      '!**/index.js',
    ],
  },
);
