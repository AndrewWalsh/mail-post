/* eslint-disable camelcase */
import { makeExecutableSchema } from 'graphql-tools';

import { getLists } from './controllers';
import { csvImport } from './handlers';

const typeDefs = `
  type Query {
    lists: [List]
  }

  type Mutation {
    importCsv (csvPath: String!, name: String!): List
  }

  type List {
    id: ID!
    name: String!
    total_subscribers: Int!
  }
`;

const getListsFormatted = listName => getLists(listName).then(lists =>
  lists.map(({ total_subscribers, name, id }) => ({ total_subscribers, name, id })));

const resolvers = {
  Query: {
    lists: () => getListsFormatted(),
  },
  Mutation: {
    importCsv: async (_, { csvPath, name }) => {
      try {
        await csvImport(csvPath, name);
        const list = await getListsFormatted(name);
        return list[0];
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
