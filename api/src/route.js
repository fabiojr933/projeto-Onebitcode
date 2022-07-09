const express = require('express');
const route = express.Router();
const userController = require('./controller/UserController');
const noteController = require('./controller/NoteController');
const WithAuth = require('./middlewares/auth');

const user = new userController();
const note = new noteController();

route.post('/user/register', user.register);
route.post('/login', user.login);

route.get('/note/search', WithAuth,  note.search);
route.post('/note', WithAuth,  note.save);
route.get('/note/:id', WithAuth, note.getById);
route.get('/note', WithAuth, note.getAll);
route.put('/note/:id', WithAuth, note.updateNote);
route.delete('/note/:id', WithAuth, note.deleteNote);

module.exports = route;