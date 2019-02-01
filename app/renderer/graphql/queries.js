/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

export const QUERY_GET_LISTS = gql`
  query GetAllLists {
    lists {
      id
      name
      total_subscribers
      createdAt
    }
  }
`;

export const QUERY_GET_CAMPAIGNS = gql`
  query GetAllCampaigns {
    campaigns {
      id
      name
      subject
      body
      listId
    }
  }
`;

export const QUERY_GET_SETTINGS = gql`
  query GetSettings {
    settings {
      amazonSESkey
      amazonSESSecretKey
      amazonRegion
      amazonWhiteLabelUrl
      amazonEmail
    }
  }
`;
