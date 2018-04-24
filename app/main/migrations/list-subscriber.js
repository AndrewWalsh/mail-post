'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ListSubscribers',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        listId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'lists',
            key: 'id'
          },
          allowNull: false,
          onDelete: 'cascade',
        },
        subscriberId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'subscribers',
            key: 'id'
          },
          allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      }
  )},
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ListSubscribers')
  }
};
