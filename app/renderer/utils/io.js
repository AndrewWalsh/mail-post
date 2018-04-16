import {
  // CSV_IMPORT,
  CSV_INVALID,
  configWebsocketClient,
  configWebsocketListeners,
} from '../../lib/websocket';
import { csvInvalid } from '../socket-handlers';

const io = configWebsocketClient();

const websocketConfig = {
  // [CSV_IMPORT]: (csvPath, socket) => {},
  [CSV_INVALID]: errorMessage => csvInvalid(errorMessage),
};

configWebsocketListeners(io, websocketConfig);

export default io;
