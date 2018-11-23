/* eslint-disable camelcase */
import { gql, makeExecutableSchema, UserInputError } from 'apollo-server-express';
import { head } from 'ramda';

import {
  getLists,
  deleteLists,
  updateOrCreateSettings,
  getSettings,
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
  }

  type Mutation {
    importCsv (csvPath: String!, name: String!): List
    deleteLists (ids: [ID]!): [List]
    updateSettings(
      amazonSESkey: String
      amazonSESSecretKey: String
      amazonRegion: String
      amazonWhiteLabelUrl: String
      amazonEmail: String
    ): Settings
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
`;

const getListsFormatted = listName => getLists(listName).then(lists => lists.map(({
  total_subscribers,
  name,
  id,
  createdAt,
}) => ({
  total_subscribers,
  name,
  id,
  createdAt,
})));

const resolvers = {
  Subscription: {
    notification: {
      subscribe: () => pubsub.asyncIterator(PUBSUB_NOTIFICATION),
    },
  },
  Query: {
    lists: () => getListsFormatted(),
    settings: () => getSettings(),
  },
  Mutation: {
    importCsv: async (_, { csvPath, name }) => {
      try {
        await csvImport(csvPath, name);
        const list = await getListsFormatted(name);
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
    updateSettings: async (_, args) => updateOrCreateSettings(args),
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
