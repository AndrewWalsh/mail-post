/**
 * Since socket-handlers rely heavily on elements that interact with external factors,
 * this file adopts inversion of control to pass in these dependencies to curried functions.
 * This makes them much easier to unit test.
 */
import { debug } from '../utils';
import { importCsv } from '../controllers';
import { csvIsValid } from './helpers';

import csvImportIoc from './csv-import';

export const csvImport = csvImportIoc({ debug, importCsv, csvIsValid }); // eslint-disable-line
