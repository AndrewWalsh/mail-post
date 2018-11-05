import {
  generateImportCsv,
  generateDeleteLists,
} from '../generate-mutation';
import { QUERY_GET_LISTS } from '..';

describe('generate mutations', () => {
  let storeStub;
  beforeEach(() => {
    storeStub = {
      readQuery: jest.fn(),
      writeQuery: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
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
      storeStub.readQuery.mockReturnValue(cache);
      importCsv.update(storeStub, { data });
      expect(storeStub.writeQuery).toHaveBeenCalledWith(expectWrite);
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
      storeStub.readQuery.mockReturnValue(cache);
      deleteLists.update(storeStub, { data });
      expect(storeStub.writeQuery).toHaveBeenCalledWith(expectWrite);
    });
  });
});
