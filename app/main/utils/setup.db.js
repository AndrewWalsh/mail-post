// Creates & configures db
import Umzug from 'umzug';
import path from 'path';
import db from '../models';
import createDb from './create.db';

export default async () => {
  if (process.env.NODE_ENV && process.env.NODE_ENV !== 'production') await createDb();
  // Run migrations & seeders
  const getUmzugConfig = pathToDirectory => ({
    storage: 'sequelize',
    storageOptions: {
      sequelize: db.sequelize,
    },
    logging: process.env.NODE_ENV === 'production'
      ? false
      : (...args) => console.log(...args),
    migrations: {
      params: [
        db.sequelize.getQueryInterface(), // queryInterface
        db.Sequelize, // DataTypes
      ],
      path: path.resolve(__dirname, pathToDirectory),
    },
  });

  try {
    await new Umzug(getUmzugConfig('../migrations')).up();
  } catch (e) {
    console.log(e);
    throw new Error('Failed to run migrations');
  }

  try {
    await new Umzug(getUmzugConfig('../seeders')).up();
  } catch (e) {
    console.log(e);
    throw new Error('Failed to seed the database');
  }
};
