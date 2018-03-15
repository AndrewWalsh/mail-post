const { Op } = require('sequelize');

module.exports = {
  development: {
    database: 'development',
    username: 'default',
    password: null,
    dialect: 'sqlite',
    storage: '../development-db.sqlite3',
    operatorsAliases: Op,
  },
  test: {
    database: 'test',
    username: 'default',
    password: null,
    dialect: 'sqlite',
    storage: '../test-db.sqlite3',
    operatorsAliases: Op,
  },
  production: {
    database: 'production',
    username: 'default',
    password: null,
    dialect: 'sqlite',
    storage: '../production-db.sqlite3',
    operatorsAliases: Op,
  },
};
