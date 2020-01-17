'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Help', 'category')
    ])
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'Help',
      'category', {
      type: Sequelize.INTEGER
    }
    )
  }
};
