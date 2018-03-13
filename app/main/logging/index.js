// @flow
import log from 'electron-log';

const logApply = (...args) => log.info(...args);

export const logAppStart = () => logApply('Starting application...');
export const logSetupDbFailed = (e: any) => logApply('SetupDb failed', e);
