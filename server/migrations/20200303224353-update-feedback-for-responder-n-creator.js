'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('Feedbacks', 'idReviewer'),
            queryInterface.removeColumn('Feedbacks', 'idReviewed'),
            queryInterface.removeColumn('Feedbacks', 'idHelp'),
            queryInterface.removeConstraint('Feedbacks', 'custom_fkey_feedbacks_reviewer'),
            queryInterface.removeConstraint('Feedbacks', 'custom_fkey_feedbacks_reviewed'),
            queryInterface.renameColumn('Feedbacks', 'message', 'messageCreator'),
            queryInterface.addColumn('Feedbacks', 'messageResponder', { type: Sequelize.STRING }),
            queryInterface.addColumn('Feedbacks', 'idResponse', { type: Sequelize.INTEGER }),
            queryInterface.addConstraint('Feedbacks', ['idResponse'], {
                type: 'foreign key',
                name: 'custom_fkey_feedbacks_response',
                references: { table: 'HelpResponses', field: 'id' },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            }),
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('Feedbacks', 'idReviewer', { type: Sequelize.NUMBER }),
            queryInterface.addColumn('Feedbacks', 'idReviewed', { type: Sequelize.NUMBER }),
            queryInterface.addColumn('Feedbacks', 'idHelp', { type: Sequelize.NUMBER }),
            queryInterface.addConstraint('Feedbacks', ['idHelp'], {
                type: 'foreign key',
                name: 'custom_fkey_feedbacks_help',
                references: { table: 'Help', field: 'id' },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            }),
            queryInterface.addConstraint('Feedbacks', ['idReviewer'], {
                type: 'foreign key',
                name: 'custom_fkey_feedbacks_reviewer',
                references: { table: 'Users', field: 'id' },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            }),
            queryInterface.addConstraint('Feedbacks', ['idReviewed'], {
                type: 'foreign key',
                name: 'custom_fkey_feedbacks_reviewed',
                references: { table: 'Users', field: 'id' },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            }),
            queryInterface.renameColumn('Feedbacks', 'messageCreator', 'message'),
            queryInterface.removeColumn('Feedbacks', 'messageResponder'),
            queryInterface.removeColumn('Feedbacks', 'idResponse'),
            queryInterface.removeConstraint('Feedbacks', 'custom_fkey_feedbacks_response')
        ])
    }
};