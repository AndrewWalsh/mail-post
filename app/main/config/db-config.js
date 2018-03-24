// @flow
const { Op } = require('sequelize');

module.exports = {
  development: {
    database: 'development',
    username: 'default',
    password: null,
    dialect: 'sqlite',
    storage: './app/main/development-db.sqlite3',
    operatorsAliases: Op,
  },
  test: {
    database: 'test',
    username: 'default',
    password: null,
    dialect: 'sqlite',
    storage: './app/main/test-db.sqlite3',
    operatorsAliases: Op,
  },
  production: {
    database: 'production',
    username: 'default',
    password: null,
    dialect: 'sqlite',
    storage: './app/main/production-db.sqlite3',
    operatorsAliases: Op,
  },
};
