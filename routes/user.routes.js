const { Router } = require('express');

const userRoutes = Router();

userRoutes.get('/:id', (req, res) => {
    res.status(200).json({
        ok: true,
        id: req.params.id
    })
});

module.exports = {
    userRoutes
}