/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

export const MUTATION_IMPORT_CSV = gql`
  mutation MUTATION_IMPORT_CSV($csvPath: String!, $name: String!) {
    importCsv(csvPath: $csvPath, name: $name) {
      id
      name
      total_subscribers
    }
  }
`;
