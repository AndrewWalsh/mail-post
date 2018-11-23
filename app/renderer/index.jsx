import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import 'normalize.css';

import App from './App';
import { store, history } from './store';
import { GlobalStyles } from './utils';

render(
  <AppContainer>
    <div>
      <GlobalStyles />
      <App store={store} history={history} />
    </div>
  </AppContainer>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <div>
          <GlobalStyles />
          <NextApp store={store} history={history} />
        </div>
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}
