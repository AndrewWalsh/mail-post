import {
  configServer,
  CSV_IMPORT,
  ON_CONNECTION,
} from '../lib/websocket';
import { debug } from './utils';
import { WORKER_PORT } from '../lib/shared-constants';
import { csvImport } from './socket-handlers';

require('electron-unhandled')();

const websocketConfig = {
  [ON_CONNECTION]: () => {
    debug('Received connection from client');
  },
  [CSV_IMPORT]: ({ csvPath }, socket) => {
    debug(`${CSV_IMPORT} message received with path ${csvPath}`);
    csvImport(csvPath, socket);
  },
};

const { server } = configServer(WORKER_PORT, websocketConfig);

server.listen(WORKER_PORT, () => {
  debug(`Server listening on port ${WORKER_PORT}`);
});
