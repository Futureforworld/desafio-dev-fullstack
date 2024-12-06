const express = require('express');
const router = express.Router();
const client = require('../config/db');

// Rota para listar todos os usuários
router.get('/', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM usuarios');
        res.json(result.rows); // Retorna os dados dos usuários
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao consultar usuários');
    }
});

// Rota para adicionar um novo usuário
router.post('/', express.json(), async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const result = await client.query(
            'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
            [nome, email, senha]
        );
        res.status(201).json(result.rows[0]); // Retorna o usuário criado
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao criar usuário');
    }
});

module.exports = router;
