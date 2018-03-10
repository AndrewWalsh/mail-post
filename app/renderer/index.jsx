import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'normalize.css';

import App from './App';
import { configureStore, history } from './store/configureStore';
import { injectGlobalStyles } from './utils';

injectGlobalStyles();
const store = configureStore();

render(
  <AppContainer>
    <App store={store} history={history} />
  </AppContainer>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextApp store={store} history={history} />
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}
