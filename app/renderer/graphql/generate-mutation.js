import { QUERY_GET_LISTS } from '.';

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

export const generateDeleteLists = ids => ({
  variables: {
    ids,
  },
  optimisticResponse: {
    deleteLists: ids.map(id => ({ id, __typename: 'List' })),
  },
  update: (store, { data: { deleteLists: listIds } }) => {
    const data = store.readQuery({ query: QUERY_GET_LISTS });
    const contains = val => listIds.some(({ id }) => id === val);
    const withoutIds = data.lists.filter(({ id }) => !contains(id));
    data.lists = withoutIds;
    store.writeQuery({ query: QUERY_GET_LISTS, data });
  },
});
