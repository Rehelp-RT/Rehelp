'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.addColumn('Help', 'latitude', { type: Sequelize.FLOAT }),
          queryInterface.addColumn('Help', 'longitude', { type: Sequelize.FLOAT }),
          queryInterface.addColumn('Help', 'address', { type: Sequelize.STRING, allowNull: true })
      ])
  },

  down: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.removeColumn('Help', 'latitude'),
          queryInterface.removeColumn('Help', 'longitude'),
          queryInterface.removeColumn('Help', 'address')
      ])
  }
};