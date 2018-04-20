import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { store } from '../store';
import { notification } from '../actions';
import { WORKER_PORT } from '../../lib/shared-constants';

const httpLink = new HttpLink({ uri: `http://localhost:${WORKER_PORT}/graphql` });

// Dispatches custom error messages to the snackbar component
const errorLink = onError(({ graphQLErrors, response }) => {
  if (Array.isArray(graphQLErrors)) {
    graphQLErrors.forEach((err) => {
      store.dispatch(notification(err.message));
      response.errors = null;
    });
  }
});

const link = ApolloLink.from([
  errorLink,
  httpLink,
]);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default apolloClient;
