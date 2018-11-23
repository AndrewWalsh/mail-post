import { debug } from '../utils';
import { importCsv } from '../controllers';
import { csvIsValid } from './helpers';

import csvImportIoc from './csv-import';

export const csvImport = csvImportIoc({ debug, importCsv, csvIsValid }); // eslint-disable-line
