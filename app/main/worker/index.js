import { BrowserWindow } from 'electron';
import { getAppPath } from '../utils';
import {
  NODE_ENV,
  DEBUG_PROD,
} from '../config/env';
import MenuBuilder from '../menu';

const worker = new BrowserWindow({ show: false });

worker.loadURL(`file://${getAppPath()}/worker/worker.html`);

worker.webContents.on('did-finish-load', async () => {
  if (!worker) {
    throw new Error('"worker" is not defined');
  }
  if (NODE_ENV === 'development' || DEBUG_PROD === 'true') {
    worker.show();
    const menuBuilder = new MenuBuilder(worker);
    menuBuilder.buildMenu();
  }
});

export default worker;
