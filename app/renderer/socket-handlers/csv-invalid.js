import { store } from '../store';
import { notification } from '../actions';

export default async (errorMessage) => {
  store.dispatch(notification(errorMessage));
};
