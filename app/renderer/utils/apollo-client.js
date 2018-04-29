import ApolloClient from 'apollo-boost';

import { store } from '../store';
import { notification } from '../actions';
import { WORKER_PORT } from '../../lib/shared-constants';

// Dispatches custom error messages to the snackbar component
const onError = (({ graphQLErrors, response }) => {
  if (Array.isArray(graphQLErrors)) {
    graphQLErrors.forEach((err) => {
      store.dispatch(notification(err.message));
      response.errors = null;
    });
  }
});

const defaults = {
  lists: [],
};

const apolloClient = new ApolloClient({
  uri: `http://localhost:${WORKER_PORT}/graphql`,
  onError,
  clientState: {
    defaults,
  },
});

export default apolloClient;
