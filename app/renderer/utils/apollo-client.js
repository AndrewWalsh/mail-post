import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, split } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import { store } from '../store';
import { notification } from '../actions';
import { WORKER_PORT } from '../../lib/shared-constants';

// Dispatches custom error messages to the snackbar component
const onErrorFn = (({ graphQLErrors }) => {
  if (Array.isArray(graphQLErrors)) {
    graphQLErrors.forEach((err) => {
      store.dispatch(notification(err.message));
    });
  }
});

const defaults = {
  lists: [],
};

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: `http://localhost:${WORKER_PORT}/graphql`,
  credentials: 'same-origin',
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:${WORKER_PORT}/graphql`,
  options: {
    reconnect: true,
  },
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const apolloClient = new ApolloClient({
  clientState: {
    defaults,
  },
  link: ApolloLink.from([
    onError(onErrorFn),
    link,
    withClientState({ defaults, cache }),
  ]),
  cache,
});

export default apolloClient;
