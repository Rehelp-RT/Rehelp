'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Help',
      'shareType', {
        type: Sequelize.STRING,
        allowNull: true
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Help', 'shareType', {
      type: Sequelize.STRING,
      allowNull: true
    })
  }
};
