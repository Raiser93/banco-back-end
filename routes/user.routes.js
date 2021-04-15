const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const userRoutes = Router();

// Controlador
const {
    userRegister,
} = require('../controllers/user.controller');

// Crear un usuario
userRoutes.post(
    '/register',
    [ // Middlawers
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validateFields
    ],
    userRegister
);

module.exports = {
    userRoutes
}