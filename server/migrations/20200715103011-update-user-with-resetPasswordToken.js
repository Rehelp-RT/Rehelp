'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
          queryInterface.addColumn(
            'Users',
            'resetPasswordToken', {
              type: Sequelize.STRING,
              allowNull: true
            }
          ),
          queryInterface.addColumn(
            'Users',
            'resetPasswordExpire', {
              type: Sequelize.DATE,
              allowNull: true
            }
          )
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn(
              'Users',
              'resetPasswordToken', {
                type: Sequelize.STRING,
                allowNull: true
              }
            ),
            queryInterface.removeColumn(
              'Users',
              'resetPasswordExpire', {
                type: Sequelize.DATE,
                allowNull: true
              }
            )
        ])
    }
};
