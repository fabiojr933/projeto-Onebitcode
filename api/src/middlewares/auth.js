require('dotenv').config();
const secret = process.env.JWT_TOKEN;
const jwt = require('jsonwebtoken');
const user = require('../models/user');

const WithAuth = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.status(401).json({ error: 'Sem autorização' });
    } else {
        jwt.verify(token, secret, (err, decode) => {
            if (err) {
                res.status(401).json({ error: 'Token invalido' });
            } else {
                req.email = decode.email;
                user.findOne({ email: decode.email })
                    .then(user => {
                        req.user = user;
                        next();
                    })
                    .catch(error => {
                        res.status(401).json({ error: 'Aconteceu algum erro ao validar o token' });
                    })
            }
        });
    }
}

module.exports = WithAuth;