// @flow
// Send a message to the main process
import { ipcRenderer } from 'electron';

// type typeOptions = {
//   title?: string,
//   defaultPath?: string,
//   buttonLabel?: string,
//   properties?: Array<string>,
//   message?: string,
//   securityScopedBookmarks?: string,
//   callback?: () => void,
// };

export default (channel: string, ...args: any) => {
  ipcRenderer.send(channel, ...args);
};
