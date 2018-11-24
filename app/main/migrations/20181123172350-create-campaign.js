'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Campaigns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      subject: {
        type: Sequelize.STRING
      },
      body: {
        type: Sequelize.STRING
      },
      plaintext: {
        type: Sequelize.BOOLEAN
      },
      slug: {
        type: Sequelize.STRING
      },
      unsubscribe: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      listId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'lists',
          key: 'id'
        },
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Campaigns');
  }
};
