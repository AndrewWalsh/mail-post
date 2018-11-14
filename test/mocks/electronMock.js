/* eslint-disable */
export const remote = {
  dialog: {
    showOpenDialog: (opts, cb) => cb(['filePath']),
    openDialog: (opts, cb) => cb('openDialog'),
  },
  getGlobal: () => '',
};
