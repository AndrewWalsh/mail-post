/* eslint-disable import/prefer-default-export */
import { pubsub } from '../utils';
import { PUBSUB_NOTIFICATION } from '../constants';

export const pubsubNotification = id => text => progress => type => (
  pubsub.publish(
    PUBSUB_NOTIFICATION,
    {
      notification: Object.assign(
        {},
        {
          id,
          type,
          text,
        },
        typeof progress === 'number' ? { progress } : null,
      ),
    },
  ));
