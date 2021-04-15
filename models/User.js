const { DataTypes } = require('sequelize');
const { dbConfig } = require('../config/database.conf');

const User = dbConfig.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: {
            msg: 'El correo ya existe'
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = {
    User
}