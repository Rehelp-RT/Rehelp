'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        const date = new Date();
        return Promise.all([
            queryInterface.bulkDelete('ForumPosts', null, {}),
            queryInterface.bulkInsert('ForumPosts', [
              { id: 2, idCategory: 2, idCreator: 1, image: null, description: 'questo e il mio primo post', createdAt: '2021-12-17 03:18:45.429+01', updatedAt: '2021-12-17 03:23:19.708+01' },
              { id: 3, idCategory: 1, idCreator: 1, image: null, description: 'questo e il mio primo post', createdAt: '2021-12-17 03:18:46.599+01', updatedAt: '2021-12-17 03:18:46.599+01' }
            ], {})
        ]);
    },
 
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('ForumPosts', null, {});
    }
};
 

