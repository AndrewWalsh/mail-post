/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

export const MutationCreateListCsv = gql`
  mutation MutationCreateListCsv($csvPath: String!, $name: String!) {
    importCsv(csvPath: $csvPath, name: $name) {
      id
      name
      total_subscribers
    }
  }
`;
