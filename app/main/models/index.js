// ReaddirSync entails not parsing es6 imports
// App is unavailable in renderer processes
const app = process && process.type !== 'renderer'
  ? require('electron').app
  : require('electron').remote.app;
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const cls = require('continuation-local-storage');
const configFile = require('../config/db-config');

// __dirname does NOT equal the current directory when compiled with webpack (electron)
// This is a nasty hack for using this file in a renderer process with webpack-dev-server
// The __dirname is incorrect due to multiple issues around this global (electron specific)
// Also see the webpack config that configures the __dirname property
// When called from the worker process, __dirname is /Users/root1/Desktop/mail-post/app/worker
// This is incorrect and causes this file to fail
// In the future, a simplification would be to remove fs.readdirSync completely
let thisDirectory = process.env.NODE_ENV && process.env.NODE_ENV === 'production'
  ? path.resolve(app.getAppPath(), './main/models')
  : __dirname;
if ((!process || process.type === 'renderer') && (process.env.NODE_ENV && process.env.NODE_ENV !== 'production')) {
  thisDirectory = path.join(thisDirectory, '../main/models');
}

// __filename does not resolve correctly in electron, so basename is hardcoded
const basename = 'index.js';
const env = process.env.NODE_ENV || 'production';
const config = configFile[env];
const db = {};

// Enable CLS
const TRANSACTION_NAMESPACE = cls.createNamespace('TRANSACTION');
Sequelize.useCLS(TRANSACTION_NAMESPACE);

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
