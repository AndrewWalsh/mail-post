import td from 'testdouble';
import { generateImportCsv } from '../generate-mutation';
import { QUERY_GET_LISTS } from '../queries';

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

    it('generateImportCsv update', () => {
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
});

