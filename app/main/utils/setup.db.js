// Creates & configures db
import sqlite from 'sqlite3';
import Umzug from 'umzug';
import path from 'path';
import { existsSync } from 'fs';
import db from '../models';

export default async () => {
  // Map env to intended db name
  const dbName = `${process.env.NODE_ENV}-db.sqlite3`;
  const dbPath = path.resolve(__dirname, '../', dbName);
  // Create db if it does not exist
  if (!existsSync(dbPath)) {
    try {
      await new Promise((resolve, reject) => {
        new sqlite.Database(dbPath, (err) => {
          if (err) reject();
          resolve();
        });
      });
    } catch (e) {
      console.log(e);
      throw new Error('Error creating db');
    }
  }

  // Run migrations
  const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
        sequelize: db.sequelize // here should be a sequelize instance, not the Sequelize module
    },
    logging: process.env.NODE_ENV === 'production'
      ? false
      : (...args) => console.log(...args),
    migrations: {
      params: [
        db.sequelize.getQueryInterface(), // queryInterface
        db.Sequelize, // DataTypes
      ],
      path: path.resolve(__dirname, '../migrations'),
    },
  });

  try {
    await umzug.up();
  } catch (e) {
    console.log(e);
    throw new Error('Failed to run migrations');
  }

  return;
};
