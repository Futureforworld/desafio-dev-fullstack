import pg from 'pg';

const { Pool } = pg;

const db = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'fernando', // O usuário que você criou
  password: 'Rock@2025', // A senha definida para o usuário
  database: 'simulacao_energia', // O nome do banco de dados
});

export default db;

