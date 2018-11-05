import configServer from '../lib/configServer';
import { debug } from './utils';
import { WORKER_PORT } from '../lib/shared-constants';
import schema from './schema';

const server = configServer(WORKER_PORT, schema);

server.listen(WORKER_PORT, () => {
  debug(`Server listening on port ${WORKER_PORT}`);
});
