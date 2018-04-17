// This package intends to compile sqlite binaries for the CreateDb script
import path from 'path';
import { execSync } from 'child_process';

execSync('npm rebuild', {
  cwd: path.join(__dirname, '..', '..', 'app'),
});
