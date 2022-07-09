const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_TOKEN;

class UserController {
    async register(req, res) {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        try {
            await user.save();
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ 'error': 'error' })
        }
    }
    async login(req, res) {    

        const { email, password } = req.body;
        try { 
            let user = await User.findOne({ email }); 
            if (!email || email == null) {
                res.status(401).json({ error: 'Não encontrado usuario com esse email' })
            } else {
               await user.isCorrectPassword(password, function (err, same) {        
                    console.log('2')         
                    if (!same) {
                        res.status(401).json({ error: 'Senha invalida' })
                    } else {                      
                        const token = jwt.sign({ email }, secret, { expiresIn: '1d' });
                        res.status(200).json({ user: user, token: token });
                    }
                }); 
            }
        } catch (error) {
            res.status(400).json({ 'error': 'Error' })
        }
    }
}
module.exports = UserController;