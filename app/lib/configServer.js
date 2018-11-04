import express from 'express';
import { ApolloServer } from 'apollo-server-express';

export default (port, schema) => {
  const app = express();
  const server = new ApolloServer(schema);
  server.applyMiddleware({ app });
  return app.listen(port);
};
