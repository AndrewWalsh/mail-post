/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

export const QueryGetAllLists = gql`
  query GetAllLists {
    lists {
      id
      name
      total_subscribers
    }
  }
`;
