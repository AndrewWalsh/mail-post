// @flow
// Send a message to the main process
import { ipcRenderer } from 'electron';

export default (channel: string, ...args: any) => {
  ipcRenderer.send(channel, ...args);
};
