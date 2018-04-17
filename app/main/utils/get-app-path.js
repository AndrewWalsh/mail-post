// __dirname behaviour is different on electron
// This module allows the root path to be set both in dev mode (node) & production (electron)
import { app } from 'electron';
import path from 'path';
import { NODE_ENV } from '../config/env';

export default () => (NODE_ENV && NODE_ENV === 'production'
  ? path.resolve(app.getAppPath())
  : path.resolve(__dirname, '../../'));
