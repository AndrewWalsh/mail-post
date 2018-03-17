// @flow
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';

import sagas from '../actions/sagas';
import rootReducer from '../reducers';

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(sagaMiddleware, router);

function configureStore() {
  const store = createStore(rootReducer, {}, enhancer);
  sagaMiddleware.run(sagas);
  return store;
}

export default { configureStore, history };
