'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Users', 'firstName', 'firstname');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Users', 'firstName', 'firstname');
  }
};
