/* eslint-disable */
export const remote = {
  dialog: {
    // replace the showOpenDialog function with a spy which returns a value
    showOpenDialog: (opts, cb) => cb(['filePath'])
  }
};
