// @flow
import { store } from '../store';
import { notification } from '../actions';

export default async (errorMessage: string) => {
  store.dispatch(notification(errorMessage));
};
