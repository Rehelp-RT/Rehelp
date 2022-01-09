'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transactions', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      idUser: { allowNull: false, type: Sequelize.INTEGER },
      idHelp: { allowNull: false, type: Sequelize.INTEGER },
      likeHelpNumber: { allowNull: false, type: Sequelize.INTEGER },
      isPositive: { allowNull: false, type: Sequelize.BOOLEAN },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { type: Sequelize.DATE }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Transactions');
  }
};
