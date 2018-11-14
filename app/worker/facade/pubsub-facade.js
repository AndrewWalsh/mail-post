/* eslint-disable import/prefer-default-export */
import { pubsub } from '../utils';
import {
  PUBSUB_NOTIFICATION,
} from '../constants';

export const pubsubNotification = id => (type, text) => (
  pubsub.publish(PUBSUB_NOTIFICATION, { notification: { id, type, text } }));
