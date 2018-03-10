import spawn from 'cross-spawn';
import path from 'path';

const result = spawn.sync(
  path.normalize('./node_modules/.bin/jest'),
  ['test/e2e/.+\\.spec\\.js', ...process.argv.slice(2)],
  { stdio: 'inherit' },
);

process.exit(result.status);
