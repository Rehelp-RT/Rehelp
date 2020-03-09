'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('Help', 'accepted', { type: Sequelize.BOOLEAN }),
            queryInterface.addColumn('Help', 'reviewed', { type: Sequelize.BOOLEAN }),
            queryInterface.addColumn('Help', 'completed', { type: Sequelize.BOOLEAN }),
            queryInterface.removeColumn('Help', 'dateCompletion')
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('Help', 'accepted'),
            queryInterface.removeColumn('Help', 'reviewed'),
            queryInterface.removeColumn('Help', 'completed'),
            queryInterface.addColumn('Help', 'dateCompletion', { type: Sequelize.DATE })
        ])
    }
};
