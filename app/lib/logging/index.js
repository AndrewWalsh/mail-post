/**
 * These logging functions denote known behaviours that should not happen.
 */
import log from 'electron-log';

const logApply = (...args) => log.error(...args);

export const logSetupDbFailed = e => logApply('SetupDb failed', e);
export const logCleanDbFailed = e => logApply('CleanDb failed', e);
export const logListNameInvalidOnCsvImport = e => logApply('Name invalid on CSV import', e);
