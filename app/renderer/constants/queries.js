/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

export const QUERY_GET_LISTS = gql`
  query GetAllLists {
    lists {
      id
      name
      total_subscribers
    }
  }
`;
