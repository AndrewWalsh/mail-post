// Check if the renderer and main bundles are built
import path from 'path';
import chalk from 'chalk';
import fs from 'fs';

function CheckBuildsExist() {
  const mainPath = path.join(__dirname, '..', '..', 'app', 'main.prod.js');
  const rendererPath = path.join(__dirname, '..', '..', 'app', 'renderer', 'dist', 'renderer.prod.js');
  const workerPath = path.join(__dirname, '..', '..', 'app', 'worker', 'dist', 'worker.prod.js');

  if (!fs.existsSync(mainPath)) {
    throw new Error(chalk.whiteBright.bgRed.bold('The main process is not built yet. Build it by running "npm run build-main"'));
  }

  if (!fs.existsSync(rendererPath)) {
    throw new Error(chalk.whiteBright.bgRed.bold('The renderer process is not built yet. Build it by running "npm run build-renderer"'));
  }

  if (!fs.existsSync(workerPath)) {
    throw new Error(chalk.whiteBright.bgRed.bold('The worker process is not built yet. Build it by running "npm run build-renderer"'));
  }
}

CheckBuildsExist();
