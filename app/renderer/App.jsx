// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { SnackbarContainer } from './containers/lib';

import Layout from './components/Layout';
import Routes from './routes';

type Props = {
  store: {},
  history: {},
};

const App = ({ store, history }: Props) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout>
        <SnackbarContainer />
        <Routes />
      </Layout>
    </ConnectedRouter>
  </Provider>
);

export default App;
