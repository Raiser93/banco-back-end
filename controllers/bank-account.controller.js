const { response, request } = require('express');
const { BankAccount } = require('../models/BankAccount');

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

module.exports = {
    createAccount,
    queryAccountUser
}