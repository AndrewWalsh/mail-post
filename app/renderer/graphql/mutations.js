/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

export const MUTATION_IMPORT_CSV = gql`
  mutation MUTATION_IMPORT_CSV($csvPath: String!, $name: String!) {
    importCsv(csvPath: $csvPath, name: $name) {
      id
      name
      total_subscribers
      createdAt
    }
  }
`;

export const MUTATION_DELETE_LISTS = gql`
  mutation MUTATION_DELETE_LISTS($ids: [ID]!) {
    deleteLists(ids: $ids) {
      id
    }
  }
`;

export const MUTATION_UPDATE_SETTINGS = gql`
  mutation MUTATION_UPDATE_SETTINGS(
    $amazonSESkey: String,
    $amazonSESSecretKey: String,
    $amazonRegion: String,
    $amazonWhiteLabelUrl: String,
    $amazonEmail: String,
  ) {
    updateSettings(
      amazonSESkey: $amazonSESkey,
      amazonSESSecretKey: $amazonSESSecretKey,
      amazonRegion: $amazonRegion,
      amazonWhiteLabelUrl: $amazonWhiteLabelUrl,
      amazonEmail: $amazonEmail,
    ) {
      amazonSESkey
      amazonSESSecretKey
      amazonRegion
      amazonWhiteLabelUrl
      amazonEmail
    }
  }
`;
