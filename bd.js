const mysql = require('mysql');
const express = require("express");
const app = express();
// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'roundhouse.proxy.rlwy.net', // Endereço do servidor MySQL
    port: 14015, // Porta do servidor MySQL
    user: 'root', // Nome de usuário do MySQL
    password: 'dfbnhGXrIghazlBtytpEybPvOrfuxagP', // Senha do usuário do MySQL
    database: 'railway' // Nome do banco de dados que deseja se conectar
  });
// Conexão com o banco de dados
connection.connect((err) => {
if (err) {
console.error('Erro ao conectar ao banco de dados:', err);
return;
}
console.log('Conexão bem-sucedida ao banco de dados MySQL');
});
module.exports = connection;