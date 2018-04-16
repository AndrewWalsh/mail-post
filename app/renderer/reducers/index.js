import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import notification from './notification';

const rootReducer = combineReducers({
  notification,
  router,
});

export default rootReducer;
