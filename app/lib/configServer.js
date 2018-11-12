import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';

import { SubscriptionServer } from 'subscriptions-transport-ws/dist/server';

import { WORKER_WS_PORT } from './shared-constants';

export default (port, schema) => {
  const app = express();
  const server = new ApolloServer(schema);
  server.applyMiddleware({ app });

  const websocketServer = createServer((request, response) => {
    response.writeHead(404);
    response.end();
  });

  websocketServer.listen(WORKER_WS_PORT);

  SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: websocketServer,
      path: '/graphql',
    },
  );

  // server.use('/graphiql', graphiqlExpress({
  //   endpointURL: '/graphql',
  //   subscriptionsEndpoint: `ws://localhost:${port}/graphql`,
  // }));

  return app.listen(port);
};
