'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Help',
      'isOffer', {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Help', 'isOffer', {
      type: Sequelize.BOOLEAN,
      allowNull: true
    })
  }
};
