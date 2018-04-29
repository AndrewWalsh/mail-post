import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'apollo-server-express';
import http from 'http';

import {
  NODE_ENV,
  DEBUG_PROD,
} from '../main/config/env';

export default (port, schema) => {
  const app = express();
  app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
  if (NODE_ENV === 'development' || DEBUG_PROD === 'true') {
    const { graphiqlExpress } = require('apollo-server-express');
    app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
  }
  const server = http.createServer(app);
  return server.listen(port);
};
