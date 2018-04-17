import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import notification from './notification';

const rootReducer = combineReducers({
  notification,
  router,
  form: formReducer,
});

export default rootReducer;
