const Sequelize = require('sequelize');

// ORM
const connectionString =
    process.env.DATABASE_URL ||
    'postgres://postgres:123456@localhost:5432/rehelp'
module.exports = new Sequelize(connectionString);