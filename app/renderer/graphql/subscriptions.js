/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

export const SUBSCRIPTION_NOTIFICATION = gql`
  subscription onNotification {
    notification {
      id
      type
      text
    }
  }
`;
