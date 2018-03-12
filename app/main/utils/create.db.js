import path from 'path';
import sqlite from 'sqlite3';
import { existsSync } from 'fs';

export default async () => {
  // Map env to intended db name
  const dbName = `${process.env.NODE_ENV}-db.sqlite3`;
  const dbPath = path.resolve(__dirname, '../', dbName);
  // Create db if it does not exist
  if (!existsSync(dbPath)) {
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
  }
};
