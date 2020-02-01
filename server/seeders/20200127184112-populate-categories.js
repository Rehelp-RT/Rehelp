'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        const date = new Date();
        return queryInterface.bulkInsert('HelpCategories', [
            { id: 1, code: 'BAB', createdAt: date, updatedAt: date, name: 'Baby sitting e dog sitting' },
            { id: 2, code: 'BES', createdAt: date, updatedAt: date, name: 'Bestiame' },
            { id: 3, code: 'CON', createdAt: date, updatedAt: date, name: 'Condivisione della conoscenza' },
            { id: 4, code: 'CUC', createdAt: date, updatedAt: date, name: 'Cucina' },
            { id: 5, code: 'AGR', createdAt: date, updatedAt: date, name: 'Lavori agricoli' },
            { id: 6, code: 'DOM', createdAt: date, updatedAt: date, name: 'Lavori domestici' },
            { id: 7, code: 'GDT', createdAt: date, updatedAt: date, name: 'Carte, giochi da tavolo e videogiochi' },
            { id: 8, code: 'HOB', createdAt: date, updatedAt: date, name: 'Hobbistica' },
            { id: 9, code: 'INF', createdAt: date, updatedAt: date, name: 'Informatica ed elettronica' },
            { id: 10, code: 'MUS', createdAt: date, updatedAt: date, name: 'Musica e canto' },
            { id: 11, code: 'SOS', createdAt: date, updatedAt: date, name: 'Sostegno alla persona' },
            { id: 12, code: 'SPO', createdAt: date, updatedAt: date, name: 'Sport' },
            { id: 13, code: 'TRA', createdAt: date, updatedAt: date, name: 'Traslochi' },
            { id: 14, code: 'VIA', createdAt: date, updatedAt: date, name: 'Mezzi di trasporto e viaggi' },
            { id: 15, code: 'VIT', createdAt: date, updatedAt: date, name: 'Vitto e alloggio' }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('HelpCategories', null, {});
    }
};