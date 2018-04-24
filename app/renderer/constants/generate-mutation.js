/* eslint-disable import/prefer-default-export */
import { QUERY_GET_LISTS } from './queries';

export const generateImportCsv = (csvPath, name) => ({
  variables: {
    csvPath,
    name,
  },
  update: (store, { data: { importCsv } }) => {
    const data = store.readQuery({ query: QUERY_GET_LISTS });
    data.lists.push(importCsv);
    store.writeQuery({ query: QUERY_GET_LISTS, data });
  },
});
