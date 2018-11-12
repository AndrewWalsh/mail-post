import Umzug from 'umzug';
import path from 'path';
import seed from '../seeders';
import { NODE_ENV } from '../config/env';
import getAppPath from './get-app-path';

const db = require('../models');

export default async () => {
  // Run migrations & seeders
  const getUmzugConfig = pathToDirectory => ({
    storage: 'sequelize',
    storageOptions: {
      sequelize: db.sequelize,
    },
    logging: NODE_ENV === 'production'
      ? false
      : (...args) => console.log(...args),
    migrations: {
      params: [
        db.sequelize.getQueryInterface(),
        db.Sequelize, // DataTypes
      ],
      path: path.resolve(getAppPath(), pathToDirectory),
      pattern: /\.js$/,
    },
  });

  try {
    await new Umzug(getUmzugConfig('./main/migrations')).up();
  } catch (e) {
    throw new Error(e);
  }

  // Seed is currently just a dummy user, this process
  // May be updated in the future
  try {
    await seed.up(db);
  } catch (e) {
    throw new Error(e);
  }
};
