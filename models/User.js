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
    identification_number: {
        type: DataTypes.CHAR(12),
        allowNull: false,
        unique: {
            msg: 'El numero de identificacion ya existe'
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: {
            msg: 'El correo ya existe'
        },
        validate: {
            isEmail: {
                msg: 'El correo ingresado no es valido'
            },
            notEmpty: {
                msg: 'El campo correo es obligatorio'
            }
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