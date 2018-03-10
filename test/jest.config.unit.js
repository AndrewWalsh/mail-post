const base = require('./jest.config.base.js');

module.exports = Object.assign(
  {},
  base,
  {
    setupTestFrameworkScriptFile: './test/unit.setuptest.js',
    rootDir: '../',
    transform: {
      '^.+\\.jsx$': 'babel-jest',
      '^.+\\.js$': 'babel-jest',
    },
    snapshotSerializers: [
      'enzyme-to-json/serializer',
    ],
    collectCoverageFrom: [
      'app/renderer/components/**/*.{js,jsx}',
      'app/renderer/utils/**/*.{js,jsx}',
      '!**/index.js',
    ],
  },
);
