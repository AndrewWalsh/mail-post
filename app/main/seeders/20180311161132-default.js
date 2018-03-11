/**
 * Authentication is not currently planned.
 * However, should this be required in the future, this implementation accounts for it.
 * It is also necessary to have a user to specify foreign keys for.
 */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.findOrCreate({
    where: {
      username: 'root',
    },
    defaults: {
      first_name: '',
      last_name: '',
      username: 'root',
      password: '',
      picture: '',
      email: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }),

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Users', [{
      username: 'root',
    }]);
  },
};
