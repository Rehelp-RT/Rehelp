'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('HelpCategories', [
            { code: 'BAB', name: 'Baby sitting e dog sitting' },
            { code: 'BES', name: 'Bestiame' },
            { code: 'CON', name: 'Condivisione della conoscenza' },
            { code: 'CUC', name: 'Cucina' },
            { code: 'AGR', name: 'Lavori agricoli' },
            { code: 'DOM', name: 'Lavori domestici' },
            { code: 'GDT', name: 'Carte, giochi da tavolo e videogiochi' },
            { code: 'HOB', name: 'Hobbistica' },
            { code: 'INF', name: 'Informatica ed elettronica' },
            { code: 'MUS', name: 'Musica e canto' },
            { code: 'SOS', name: 'Sostegno alla persona' },
            { code: 'SPO', name: 'Sport' },
            { code: 'TRA', name: 'Traslochi' },
            { code: 'VIA', name: 'Mezzi di trasporto e viaggi' },
            { code: 'VIT', name: 'Vitto e alloggio' }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('HelpCategories', null, {});
    }
};