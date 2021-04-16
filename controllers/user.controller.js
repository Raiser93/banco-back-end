const bcrypt = require('bcrypt');
const { response, request } = require('express');
const { generateJWT } = require('../helpers/jwt');
const { User } = require('../models/User');

// Registrar usuario
const userRegister = async (req = request, res = response) => {
    const {name, email, password, identification_number} = req.body;
    try {
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        const passwordBcrypt = bcrypt.hashSync(password, salt);

        // Crear Usuario
        const user = await User.create({name, email, password: passwordBcrypt, identification_number});

        // Generar JWT
        const token = await generateJWT({
            id: user.id,
            name: user.name
        });
        
        res.status(201).json({
            ok: true,
            id: user.id,
            name: user.name,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: error.errors[0] ? error.errors[0].message : 'Ocurrio un error al tratar de registra el usuario',
        })
    }
}

module.exports = {
    userRegister,
}