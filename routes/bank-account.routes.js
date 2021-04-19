const { Router } = require('express');
const { check } = require('express-validator');
const {
    createAccount,
    queryAccountUser,
    createAccountThird,
    getAccountThird
} = require('../controllers/bank-account.controller');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const bankAccountRoutes = Router();

bankAccountRoutes.post(
    '/create-account',
    [
        validateJWT,
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

bankAccountRoutes.get(
    '/accounts-get-third/:userId',
    [
        validateJWT
    ],
    getAccountThird
);

bankAccountRoutes.post(
    '/accounts-create-third/:userId',
    [
        validateJWT,
        check('alias', 'El campo alias es obligatorio').not().isEmpty(),
        check('bank', 'El entidad bancaria es obligatorio').not().isEmpty(),
        check('type_account', 'El tipo de cuenta es obligatorio').not().isEmpty(),
        check('num_account', 'El campo numero de cuenta es obligatorio').not().isEmpty(),
        check('identification_number', 'El campo identificacion es obligatorio').not().isEmpty(),
        check('type_currency', 'El campo tipo de moneda es obligatorio').not().isEmpty(),
        validateFields
    ],
    createAccountThird
);
module.exports = {
    bankAccountRoutes
}