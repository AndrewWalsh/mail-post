import configServer from '../lib/configServer';
import { WORKER_PORT } from '../lib/shared-constants';
import schema from './schema';

configServer(WORKER_PORT, schema);
