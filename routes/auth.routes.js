const { Router } = require('express');
const { check } = require('express-validator');
const { userLogin, renewToken } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const authRoutes = Router();

// Logger Usuario
authRoutes.post(
    '/login',
    [ // Middlawers
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validateFields
    ],
    userLogin
);

// Validar Token y generar uno nuevo
authRoutes.get(
    '/renew',
    validateJWT,
    renewToken
);
module.exports = {
    authRoutes
}