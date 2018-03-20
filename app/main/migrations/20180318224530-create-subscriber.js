'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Subscribers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        validate: { isEmail: true },
        unique: true,
      },
      template_data: {
        type: Sequelize.JSON,
        defaultValue: null,
        allowNull: true,
      },
      has_unsubscribed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      finalised: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Subscribers');
  }
};
