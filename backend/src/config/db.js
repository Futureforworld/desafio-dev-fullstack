const { Client } = require('pg');
require('dotenv').config();

// Criando a conexão com o banco de dados PostgreSQL
const client = new Client({
    user: 'postgres',           // Usuário do PostgreSQL
    host: 'localhost',          // Endereço do banco (localhost se estiver na máquina local)
    database: 'app_db',         // Nome do banco de dados (substitua conforme necessário)
    password: process.env.PG_PASSWORD,  // Senha do PostgreSQL armazenada no .env
    port: 5432,                 // Porta padrão do PostgreSQL
});

// Tentando conectar ao banco de dados
client.connect()
    .then(() => console.log('Conectado ao banco de dados com sucesso!'))
    .catch(err => console.error('Erro ao conectar ao banco de dados', err));

module.exports = client;
