// @flow
import { CSV_IMPORT } from '../../../ipcChannels';
import ipcSend from './ipcSend';

export default (...args: any) => ipcSend(CSV_IMPORT, ...args);
