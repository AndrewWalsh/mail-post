const { Application } = require('spectron');
const electronPath = require('electron');
const path = require('path');

module.exports = () => {
  const appPath = path.resolve(`${__dirname}/../app`);
  const app = new Application({
    path: electronPath,
    args: [appPath],
  });

  process.app = app;
};
