// @flow
import Umzug from 'umzug';
import path from 'path';
import db from '../models';
import seed from '../seeders';
import { NODE_ENV } from '../config/env';
import { getAppPath } from './';

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
    throw new Error('Failed to run migrations');
  }

  // Seed is currently just a dummy user, this process
  // May be updated in the future
  try {
    await seed.up(db);
  } catch (e) {
    throw new Error('Failed to seed the database');
  }
};
