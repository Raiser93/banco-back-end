const bcrypt = require('bcrypt');
const { response, request } = require('express');
const { generateJWT } = require('../helpers/jwt');
const { User } = require('../models/User');

// Logger usuario
const userLogin =  async (req = request, res = response) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con este correo'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        // Generar JWT
        const token = await generateJWT({
            id: user.id,
            name: user.name
        });

        res.status(200).json({
            ok: true,
            id: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio un error al tratar de iniciar sesion'
        });
    }
}

const renewToken = async (req = request, res = response) => {
    const id = req.id;

    // Obtener el usuario por id
    const user = await User.findOne({
        where: {
            id
        }
    });

    // Generar el TOKEN - JWT
    const token = await generateJWT({id, name: user.name});

    res.status(200).json({
        ok: true,
        id,
        name: user.name,
        token
    });

}

module.exports = {
    userLogin,
    renewToken
}