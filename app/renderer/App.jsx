import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import Layout from './components/Layout';
import Routes from './routes';

type Props = {
  store: {},
  history: {}
};

const App = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout>
        <Routes />
      </Layout>
    </ConnectedRouter>
  </Provider>
);

export default App;
