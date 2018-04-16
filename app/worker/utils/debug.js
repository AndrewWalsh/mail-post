import { remote } from 'electron';
import chalk from 'chalk';

const { log } = remote.getGlobal('console');

export default (message) => {
  const prepend = chalk.yellow('Worker');
  return log(`${prepend} - ${message}`);
};
