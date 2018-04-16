// @flow
const { Op } = require('sequelize');
const path = require('path');
const app = process && process.type !== 'renderer'
  ? require('electron').app
  : require('electron').remote.app;

module.exports = {
  development: {
    database: 'development',
    username: 'default',
    password: null,
    dialect: 'sqlite',
    storage: path.resolve(app.getAppPath(), '../development-db.sqlite3'),
    operatorsAliases: Op,
  },
  test: {
    database: 'test',
    username: 'default',
    password: null,
    dialect: 'sqlite',
    storage: path.resolve(app.getAppPath(), '../test-db.sqlite3'),
    operatorsAliases: Op,
  },
  production: {
    database: 'production',
    username: 'default',
    password: null,
    dialect: 'sqlite',
    storage: path.resolve(app.getAppPath(), '../production-db.sqlite3'),
    operatorsAliases: Op,
  },
};
