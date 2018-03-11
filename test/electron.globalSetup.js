const { Application } = require('spectron');
const electronPath = require('electron');
const path = require('path');

module.exports = () => {
  const app = new Application({
    path: electronPath,
    args: [path.join(__dirname, '..', 'app', 'renderer', 'app.html')],
  });

  process.app = app;
};
