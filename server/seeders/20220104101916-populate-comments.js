'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.bulkDelete('Comments', null, {}),
            queryInterface.bulkInsert('Comments', [
              { id: 1, idPost: null, idHelp: 1, idCreator: 1, message: "messaggio modificato", createdAt: '2021-12-17 02:49:55.2+01', updatedAt: '2021-12-17 03:26:50.808+01' },
              { id: 2, idPost: null, idHelp: 1, idCreator: 1, message: "nuova prova", createdAt: '2021-12-17 02:50:22.483+01', updatedAt: '2021-12-17 02:50:22.483+01' },
              { id: 3, idPost: null, idHelp: 1, idCreator: 1, message: "nuova prova", createdAt: '2021-12-17 02:55:08.673+01', updatedAt: '2021-12-17 02:55:08.673+01' },
              { id: 4, idPost: null, idHelp: 1, idCreator: 1, message: "nuova prova", createdAt: '2021-12-17 02:56:51.043+01', updatedAt: '2021-12-17 02:56:51.043+01' },
              { id: 5, idPost: null, idHelp: 1, idCreator: 1, message: "nuova prova", createdAt: '2021-12-17 02:57:20.146+01', updatedAt: '2021-12-17 02:57:20.146+01' },
              { id: 6, idPost: null, idHelp: 1, idCreator: 1, message: "nuova prova", createdAt: '2021-12-17 02:59:42.328+01', updatedAt: '2021-12-17 02:59:42.328+01' },
              { id: 7, idPost: null, idHelp: 1, idCreator: 1, message: "nuova prova", createdAt: '2021-12-17 03:01:18.626+01', updatedAt: '2021-12-17 03:01:18.626+01' }
            ], {})
        ]);
    },
 
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Comments', null, {});
    }
};
 

