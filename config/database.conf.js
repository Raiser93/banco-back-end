const {Sequelize} = require('sequelize');
require('dotenv').config();

const dbConfig = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.HOST,
        dialect: 'mysql'
    }
)

module.exports = {
    dbConfig
}