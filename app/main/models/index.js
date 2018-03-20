// @flow
// Note to self - readdirSync entails not parsing es6 imports
const app = require('electron').app;
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const configFile = require('../config/db-config');

// __dirname does NOT equal the current directory when compiled with webpack (electron)
const thisDirectory = process.env.NODE_ENV && process.env.NODE_ENV === 'production'
  ? path.resolve(app.getAppPath(), './main/models')
  : __dirname;
// __filename does not resolve correctly in electron, so basename is hardcoded
const basename = 'index.js';
const env = process.env.NODE_ENV || 'production';
const config = configFile[env];
const db: any = {};

const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(thisDirectory)
  .filter(file => file.includes('.') && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    const model = sequelize.import(path.join(thisDirectory, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
