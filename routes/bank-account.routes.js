const { Router } = require('express');
const { check } = require('express-validator');
const { createAccount, queryAccountUser } = require('../controllers/bank-account.controller');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const bankAccountRoutes = Router();

bankAccountRoutes.post(
    '/create-account',
    [
        check('num_account', 'El campo numero de cuenta es obligatorio').not().isEmpty(),
        check('type_account', 'El campo tipo de cuenta es obligatorio').not().isEmpty(),
        check('balance_account', 'El campo saldo es obligatorio').not().isEmpty(),
        check('type_currency', 'El campo tipo de moneda es obligatorio').not().isEmpty(),
        validateFields
    ],
    createAccount
);

bankAccountRoutes.get(
    '/accounts-user-id/:userId',
    [
        validateJWT
    ],
    queryAccountUser
);
module.exports = {
    bankAccountRoutes
}