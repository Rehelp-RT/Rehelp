'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        const date = new Date();
        return Promise.all([
            queryInterface.bulkDelete('HelpTypes', null, {}),
            queryInterface.bulkInsert('HelpTypes', [
            { id: 1, code: 'MEH', createdAt: date, updatedAt: date, name: 'Incontra e aiuta' },
            { id: 2, code: 'COH', createdAt: date, updatedAt: date, name: 'Aiuto collettivo' },
            { id: 3, code: 'IMH', createdAt: date, updatedAt: date, name: 'Aiuto immediato' },
            { id: 4, code: 'MES', createdAt: date, updatedAt: date, name: 'Incontra e condividi' }
            ], {})
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('HelpTypes', null, {});
    }
};

