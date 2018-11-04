import td from 'testdouble';
import {
  generateImportCsv,
  generateDeleteLists,
} from '../generate-mutation';
import { QUERY_GET_LISTS } from '..';

require('testdouble-jest')(td, jest);

describe('generate mutations', () => {
  let storeStub;
  beforeEach(() => {
    storeStub = {
      readQuery: td.function(),
      writeQuery: td.function(),
    };
  });

  describe('generateImportCsv', () => {
    const csvPath = 'a csv path';
    const name = 'a name';
    it('generateImportCsv snapshot', () => {
      expect(generateImportCsv(csvPath, name)).toMatchSnapshot();
    });

    it('generateImportCsv update appends list to cache', () => {
      const importCsv = generateImportCsv(csvPath, name);
      const data = {
        importCsv: 'test',
      };
      const cache = { lists: ['hi'] };
      const expectRead = { query: QUERY_GET_LISTS };
      const expectWrite = {
        ...expectRead,
        data: {
          lists: [...cache.lists, data.importCsv],
        },
      };
      td.when(storeStub.readQuery(expectRead)).thenReturn(cache);
      importCsv.update(storeStub, { data });
      td.verify(storeStub.writeQuery(expectWrite));
    });
  });

  describe('generateDeleteLists', () => {
    const ids = [
      { id: '1' },
      { id: '2' },
      { id: '3' },
    ];
    it('generateDeleteLists snapshot', () => {
      expect(generateDeleteLists(ids)).toMatchSnapshot();
    });

    it('generateDeleteLists update deletes list from cache', () => {
      const deleteLists = generateDeleteLists(ids);
      const data = {
        deleteLists: ids.slice(1),
      };
      const cache = { lists: ids };
      const expectRead = { query: QUERY_GET_LISTS };
      const expectWrite = {
        ...expectRead,
        data: {
          lists: [ids[0]],
        },
      };
      td.when(storeStub.readQuery(expectRead)).thenReturn(cache);
      deleteLists.update(storeStub, { data });
      td.verify(storeStub.writeQuery(expectWrite));
    });
  });
});
