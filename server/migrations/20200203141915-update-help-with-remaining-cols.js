'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('Help', 'id_creator', { type: Sequelize.INTEGER }),
            queryInterface.addColumn('Help', 'halfhourValidity', { type: Sequelize.INTEGER }),
            queryInterface.addColumn('Help', 'dateStartValidity', { type: Sequelize.DATE }),
            queryInterface.addColumn('Help', 'dateEndValidity', { type: Sequelize.DATE }),
            queryInterface.addColumn('Help', 'dateCompletion', { type: Sequelize.DATE })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('Help', 'id_creator'),
            queryInterface.removeColumn('Help', 'halfhourValidity'),
            queryInterface.removeColumn('Help', 'dateStartValidity'),
            queryInterface.removeColumn('Help', 'dateEndValidity'),
            queryInterface.removeColumn('Help', 'dateCompletion')
        ])
    }
};