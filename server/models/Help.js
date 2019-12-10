const Sequelize = require('sequelize');
const db = require('../config/database');

const Help = db.define('help', {
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    category: {
        type: Sequelize.STRING
    }
});

module.exports = Help;