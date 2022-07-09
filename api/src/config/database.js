const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/projeto_teste', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Banco de dados conectado com sucesso'))
  .catch((erro) => console.log('ERRO AO CONECTAR COM A BANCO DE DADOS ' + erro));