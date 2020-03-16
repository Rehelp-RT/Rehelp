'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Messages', {
              id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
              idResponse: { allowNull: false, type: Sequelize.INTEGER },
              idAuthor: { allowNull: false, type: Sequelize.INTEGER },
              body: { allowNull: false, type: Sequelize.STRING },
              createdAt: { allowNull: false, type: Sequelize.DATE },
              updatedAt: { type: Sequelize.DATE }
          });
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Messages');
  }
};