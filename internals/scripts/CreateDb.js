import path from 'path';
import { existsSync } from 'fs';
import sqlite from '../../app/node_modules/sqlite3';

const createDb = async (dbName, dbPath) => {
  if (existsSync(dbPath)) return;
  try {
    await new Promise((resolve, reject) => {
      new sqlite.Database(dbPath, (err) => { // eslint-disable-line no-new
        if (err) reject();
        resolve();
      });
    });
  } catch (e) {
    console.log(e);
    throw new Error('Error creating db');
  }
};

{
  const getDbName = name => `${name}-db.sqlite3`;
  const getDbPath = dbName => path.resolve(__dirname, '../../', dbName);
  const getDbExists = dbPath => existsSync(dbPath);
  ['production', 'development', 'test'].forEach((name) => {
    const dbName = getDbName(name);
    const dbPath = getDbPath(dbName);
    if (!getDbExists(dbPath)) createDb(dbName, dbPath);
  });
}
