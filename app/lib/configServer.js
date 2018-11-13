import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';

import { SubscriptionServer } from '../../node_modules/subscriptions-transport-ws/dist/server';
import { debug } from '../worker/utils';

export default (port, schema) => {
  const app = express();
  const server = new ApolloServer({ schema });
  server.applyMiddleware({
    app,
    path: '/graphql',
    gui: { subscriptionEndpoint: '/graphql' },
  });

  const httpServer = createServer(app);

  SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: '/graphql',
    },
  );

  return httpServer.listen(port, () => {
    debug(`Server listening on port ${port}`);
  });
};
