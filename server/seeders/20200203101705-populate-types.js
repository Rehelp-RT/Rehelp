'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        const date = new Date();
        return queryInterface.bulkInsert('HelpTypes', [
            { id: 1, code: 'MEH', createdAt: date, updatedAt: date, name: 'Incontra e aiuta (Meet and Help)' },
            { id: 2, code: 'COH', createdAt: date, updatedAt: date, name: 'Aiuto collettivo (Collaborative Help)' },
            { id: 3, code: 'IMH', createdAt: date, updatedAt: date, name: 'Aiuto immediato (Immediate Help)' },
            { id: 4, code: 'MEU', createdAt: date, updatedAt: date, name: 'Parliamone insieme (Meet Up)' },
            { id: 5, code: 'MES', createdAt: date, updatedAt: date, name: 'Incontra e condividi (Meet and Share)' },
            { id: 6, code: 'GAS', createdAt: date, updatedAt: date, name: 'Condividi orto (Garden Share)' }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('HelpTypes', null, {});
    }
};