'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Feedbacks');
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.createTable('Feedbacks', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                messageCreator: { type: Sequelize.STRING },
                messageResponder: { type: Sequelize.STRING },
                idResponse: { type: Sequelize.INTEGER },
                ratingCreator: { type: Sequelize.INTEGER },
                ratingResponder: { type: Sequelize.INTEGER }
            }),
            queryInterface.addConstraint('Feedbacks', ['idResponse'], {
                type: 'foreign key',
                name: 'custom_fkey_feedbacks_response',
                references: { table: 'HelpResponses', field: 'id' },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            })
        ])

    }
};
