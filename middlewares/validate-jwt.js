const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {
    // leer token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        const {id} = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.id = id;

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
}

module.exports = {
    validateJWT
}