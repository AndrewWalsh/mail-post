import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import configWebsocketListeners from './configWebsocketListeners';

export default (port, websocketConfig) => {
  const app = express();
  const server = http.createServer(app);
  const io = socketIo(server);
  configWebsocketListeners(io, websocketConfig, true);
  return {
    io,
    server: server.listen(port),
  };
};
