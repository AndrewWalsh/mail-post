

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    first_name: '',
    last_name: '',
    username: 'root',
    password: '',
    picture: '',
    email: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Users', [{
      username: 'root',
    }]);
  },
};
