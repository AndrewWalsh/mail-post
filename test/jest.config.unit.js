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
      // Main files
      'app/main/events/**/*.js',
      'app/main/utils/**/*.js',
      'app/main/config/**/*.js',
      'app/main/ipc/**/*.js',
      'app/main/controllers/**/*.js',
      // Renderer files
      'app/renderer/reducers/**/*.{js,jsx}',
      'app/renderer/actions/**/*.{js,jsx}',
      'app/renderer/components/**/*.{js,jsx}',
      'app/renderer/containers/**/*.{js,jsx}',
      'app/renderer/utils/**/*.{js,jsx}',
      'app/renderer/ipc/**/*.{js,jsx}',
      // Ignore index.js files
      '!**/index.js',
    ],
  },
);
