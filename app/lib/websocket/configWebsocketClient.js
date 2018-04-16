import io from 'socket.io-client';
import { WORKER_PORT } from '../shared-constants';

export default () => io(`http://localhost:${WORKER_PORT}`);
