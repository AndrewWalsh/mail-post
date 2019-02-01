import { gql, makeExecutableSchema, UserInputError } from 'apollo-server-express';
import { head } from 'ramda';

import {
  getCampaigns,
  getLists,
  deleteCampaigns,
  deleteLists,
  updateOrCreateSettings,
  getSettings,
  createCampaign,
} from './controllers';
import { csvImport } from './handlers';
import { pubsub } from './utils';

import { PUBSUB_NOTIFICATION } from './constants';

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

const typeDefs = gql`
  type Subscription {
    notification: Notification
  }

  type Query {
    lists: [List]
    settings: Settings
    campaigns: [Campaign]
  }

  type Mutation {
    importCsv (csvPath: String!, name: String!): List
    deleteLists (ids: [ID]!): [List]
    deleteCampaigns (ids: [ID]!): [List]

    updateSettings(
      amazonSESkey: String
      amazonSESSecretKey: String
      amazonRegion: String
      amazonWhiteLabelUrl: String
      amazonEmail: String
    ): Settings

    createCampaign(
      name: String!,
      subject: String!,
      body: String!,
      listId: String!,
    ): Campaign
  }

  type Notification {
    id: ID!
    type: String!
    text: String
    progress: Int
  }

  type List {
    id: ID!
    name: String
    total_subscribers: Int
    createdAt: String
  }

  type Settings {
    amazonSESkey: String
    amazonSESSecretKey: String
    amazonRegion: String
    amazonWhiteLabelUrl: String
    amazonEmail: String
  }

  type Campaign {
    id: ID!
    name: String!
    subject: String!
    body: String!
    listId: String!
  }
`;

const resolvers = {
  Subscription: {
    notification: {
      subscribe: () => pubsub.asyncIterator(PUBSUB_NOTIFICATION),
    },
  },
  Query: {
    lists: () => getLists(),
    settings: () => getSettings(),
    campaigns: () => getCampaigns(),
  },
  Mutation: {
    importCsv: async (_, { csvPath, name }) => {
      try {
        await csvImport(csvPath, name);
        const list = await getLists(name);
        return head(list);
      } catch (e) {
        throw new UserInputError(e);
      }
    },
    deleteLists: async (_, { ids }) => {
      try {
        const deleted = await deleteLists(ids);
        return deleted.map(id => ({ id }));
      } catch (e) {
        throw new UserInputError(e);
      }
    },
    deleteCampaigns: async (_, { ids }) => {
      try {
        const deleted = await deleteCampaigns(ids);
        return deleted.map(id => ({ id }));
      } catch (e) {
        throw new UserInputError(e);
      }
    },
    updateSettings: (_, args) => updateOrCreateSettings(args),
    createCampaign: (_, args) => createCampaign(args),
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
