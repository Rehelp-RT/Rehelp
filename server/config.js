require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'rehelp',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'postgres',
    },
    test: {
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'rehelp',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'postgres',
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        dialectOptions: process.env.DB_SSL === 'true' ? {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        } : {},
    },
};
