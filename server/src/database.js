require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.database_name, process.env.database_user, process.env.database_password, {
    host: process.env.database_host,
    dialect: 'mysql',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    waitForConnections: process.env.database_waitForConnections === 'true',
    connectionLimit: parseInt(process.env.database_connectionLimit),
    queueLimit: parseInt(process.env.database_queueLimit)
});

module.exports = sequelize;