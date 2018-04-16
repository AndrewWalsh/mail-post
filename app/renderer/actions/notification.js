import { NOTIFICATION } from '../types';

const notification = payload => ({
  type: NOTIFICATION,
  payload,
});

export default notification;
