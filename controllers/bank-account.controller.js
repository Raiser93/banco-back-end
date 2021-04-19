const { response, request } = require('express');
const { BankAccount } = require('../models/BankAccount');
const { BankAccountThird } = require('../models/BankAccountThird');

const createAccount = async (req = request, res = response) => {
    try {
        const account = await BankAccount.create(req.body);
        res.status(200).json({
            ok: true,
            account
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            error: error.errors[0] ? error.errors[0].message : ''
        });
    }
}

const queryAccountUser = async (req = request, res = response) => {
    const { userId } = req.params;
    try {
        const accounts = await BankAccount.findAll({
            where: {
                userId
            }
        })

        res.status(200).json({
            ok: true,
            accounts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            error: error.errors[0] ? error.errors[0].message : ''
        });
    }
}

const createAccountThird = async (req = request,res = response) => {
    const { id, userId } = req.params;
    const {
        alias,
        bank,
        type_account,
        num_account,
        identification_number,
        type_currency,
    } = req.body;
    try {
        console.log({
            alias,
            bank,
            type_account,
            num_account,
            identification_number,
            type_currency,
        });
        const validateAccount = await BankAccountThird.findAll({
            where: {
                num_account,
                userId
            }
        });

        if (validateAccount.length) {
            return res.status(400).json({
                ok: false,
                msg: 'El numero de cuenta ya esta registrado con el alias: ' + validateAccount[0].alias
            });
        }
        const accountThrid = await BankAccountThird.create({
            alias,
            bank,
            type_account,
            num_account,
            identification_number,
            type_currency,
            userId
        });

        res.status(200).json({
            ok: true,
            accountThrid
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: error.errors[0] ? error.errors[0].message : 'Ocurrio un error al tratar de crear una cuenta de terceros'
        })
    }
}

const getAccountThird = async (req = request, res = response) => {
    const  { userId } = req.params;
    try {
        const accountsThird = await BankAccountThird.findAll({
            where: {
                userId
            }
        });

        res.status(200).json({
            ok: true,
            accountsThird
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: error.errors[0] ? error.errors[0].message : 'Ocurrio un error al tratar de obtener las cuentas de terceros'
        })
    }
}

module.exports = {
    createAccount,
    queryAccountUser,
    createAccountThird,
    getAccountThird
}