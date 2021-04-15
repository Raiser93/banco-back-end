const { DataTypes } = require('sequelize');
const { dbConfig } = require('../config/database.conf');
const { User } = require('./User');

const BankAccount = dbConfig.define('bank_account', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    num_account: {
        type: DataTypes.CHAR(11),
        unique: {
            msg: 'El numero de cuenta ya esta registrado'
        }
    },
    type_account: {
        type: DataTypes.ENUM(['SAVINGS_ACCOUNT', 'CURRENT_ACCOUNT']),
        defaultValue: 'SAVINGS_ACCOUNT'
    },
    balance_account: {
        type: DataTypes.CHAR,
        defaultValue: 0
    },
    type_currency: {
        type: DataTypes.ENUM(['CO', 'USD']),
        defaultValue: 'CO'
    }
});

BankAccount.belongsTo(User);

module.exports = {
    BankAccount
}