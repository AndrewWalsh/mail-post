import log from 'electron-log';

const logApply = (...args) => log.error(...args);

export const logSetupDbFailed = e => logApply('SetupDb failed', e);
export const logCleanDbFailed = e => logApply('CleanDb failed', e);
