// @flow
import log from 'electron-log';

const logApply = (...args) => log.error(...args);

export const logSetupDbFailed = (e: any) => logApply('SetupDb failed', e);
export const logCleanDbFailed = (e: any) => logApply('CleanDb failed', e);
