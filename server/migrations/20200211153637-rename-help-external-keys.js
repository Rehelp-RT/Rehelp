'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.renameColumn('Help', 'id_creator', 'idCreator'),
            queryInterface.renameColumn('Help', 'id_category', 'idCategory'),
            queryInterface.renameColumn('Help', 'id_type', 'idType')
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.renameColumn('Help', 'idCreator', 'id_creator'),
            queryInterface.renameColumn('Help', 'idCategory', 'id_category'),
            queryInterface.renameColumn('Help', 'idType', 'id_type')
        ]);
    }
};