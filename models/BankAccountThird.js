const { DataTypes } = require('sequelize');
const { dbConfig } = require('../config/database.conf');
const { User } = require('./User');

const BankAccountThird = dbConfig.define('bank_account_third', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    alias: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type_account: {
        type: DataTypes.ENUM(['SAVINGS_ACCOUNT', 'CURRENT_ACCOUNT']),
        defaultValue: 'SAVINGS_ACCOUNT'
    },
    num_account: {
        type: DataTypes.CHAR(11)
    },
    identification_number: {
        type: DataTypes.CHAR(12),
        allowNull: false
    },
    type_currency: {
        type: DataTypes.ENUM(['CO', 'USD']),
        defaultValue: 'CO'
    }
});

BankAccountThird.belongsTo(User);

module.exports = {
    BankAccountThird
}