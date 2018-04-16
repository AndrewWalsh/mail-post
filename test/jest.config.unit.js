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
      /* Renderer files */
      'app/renderer/**/*.js',
      '!app/renderer/store/**/*.js', // Not worth covering
      /* Worker files */
      'app/worker/**/*.js',
      '!app/worker/controllers/**/*.js', // Covered by integration tests
      /* Common ignore */
      '!**/utils/**/*', // Small helper files not worth covering
      '!**/*.prod.js', // Production bundles
      '!**/dist/**', // Dist files
      '!**/index.js', // index.js files are primarily used to export files
    ],
  },
);
