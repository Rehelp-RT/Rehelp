'use strict';
 
module.exports = {
  up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.bulkDelete('Users', null, {}),
            queryInterface.bulkInsert('Users', [
            { id: 1, firstname: 'Ben', lastname: 'Parker', birthdate: '1989-11-29', createdAt: '2021-11-29 15:47:30.532+01', updatedAt: '2021-12-06 12:04:43.377+01', password: '$2a$10$T0v/lEkjO3MwAfbh7z2m4ucNIpoPurBIHJFGjQA2qkUqPuJgzd4Z.', avatar: 'avatar/riavqfkdksfh3end3xjw', cf: null, likehelps: 6, latitude: 41.9031897, longitude: 12.4795106, city: 'Roma', country: 'Italia', email: 'ben@gmail.com', loginLocal: true, loginFacebook: false, loginGoogle: false, idFacebook: null, idGoogle: null, description: null, phoneNumber: '3337492867', resetPasswordToken: null, resetPasswordExpire: null },
 
            { id: 2, firstname: 'Christina', lastname: 'Hallmar', birthdate: null, createdAt: '2021-11-29 16:09:07.834+01', updatedAt: '2021-12-05 20:28:33.276+01', password: '$2a$10$fRovkmXDE2VLIvHBaQyKBeevjV1dFlj7FIdOY1s57oLtUusV6aGC6', avatar: 'avatar/yf1vpjbsb4gngw5yeiqb', cf: null, likehelps: 4, latitude: null, longitude: null, city: null, country: null, email: 'christina@gmail.com', loginLocal: true, loginFacebook: false, loginGoogle: false, idFacebook: null, idGoogle: null, description: null, phoneNumber: null, resetPasswordToken: null, resetPasswordExpire: null },
 
            { id: 3, firstname: 'Michael', lastname: 'Dam', birthdate: null, createdAt: '2021-11-29 16:15:49.08+01', updatedAt: '2021-12-05 20:29:48.922+01', password: '$2a$10$qoHaZETVDFZ1cgywsA5LluAGFJclzBPtLkXpw7rNHMoMpgFkl9m.6', avatar: 'avatar/ffmg7eo2tzbgpgmcauxw',  cf: null,likehelps: 4, latitude: null, longitude: null, city: null, country: null, email: 'michael@gmail.com', loginLocal: true, loginFacebook: false, loginGoogle: false, idFacebook: null, idGoogle: null, description: null, phoneNumber: null, resetPasswordToken: null, resetPasswordExpire: null }
            ], {})
        ]);
  },
 
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
 

