/* eslint global-require: 0 */
import { app, BrowserWindow } from 'electron';

import MenuBuilder from './main/menu';
import { setupDb, cleanDb, getAppPath } from './main/utils';
import {
  NODE_ENV,
  DEBUG_PROD,
  UPGRADE_EXTENSIONS,
} from './main/config/env';
import {
  logSetupDbFailed,
  logCleanDbFailed,
} from './lib/logging';

require('electron-unhandled')();

let mainWindow = null;

if (NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (NODE_ENV === 'development' || DEBUG_PROD === 'true') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(getAppPath(), 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS',
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('ready', async () => {
  if (NODE_ENV === 'development' || DEBUG_PROD === 'true') {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
  });

  mainWindow.loadURL(`file://${getAppPath()}/renderer/renderer.html`);

  mainWindow.webContents.on('did-finish-load', async () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    require('./main/worker');
    // Run migrations
    try {
      await setupDb();
    } catch (e) {
      logSetupDbFailed(e);
    }
    // Remove unfinished items from db
    try {
      await cleanDb();
    } catch (e) {
      logCleanDbFailed(e);
    }
    // Show app
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});
