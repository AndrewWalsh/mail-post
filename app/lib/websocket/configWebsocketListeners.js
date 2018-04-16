import { ON_CONNECTION } from './channels';

const setupListeners = (channelListeners, websocketConfig, socket) => {
  Object.keys(channelListeners).forEach((channel) => {
    socket.on(channel, data => websocketConfig[channel](data, socket));
  });
};

/**
 * Configures socket.io listeners
 * When a connection is received, all listeners are registered
 * When a message is received, calls the listener function specified in websocketConfig
 * This protocol enforces having only one argument from the client.
 * All listener functions are called with two arguments (data, socket)
 */

export default (io, websocketConfig, server = false) => {
  const {
    [ON_CONNECTION]: connection,
    ...channelListeners
  } = websocketConfig;

  if (server) {
    io.on(ON_CONNECTION, (socket) => {
      if (connection) connection(socket);
      setupListeners(channelListeners, websocketConfig, socket);
    });
  } else {
    setupListeners(channelListeners, websocketConfig, io);
  }
};
