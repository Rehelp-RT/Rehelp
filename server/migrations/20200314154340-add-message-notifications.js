'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Notifications', 'message', {
        type: Sequelize.STRING
      }
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Notifications', 'message')
  }
};