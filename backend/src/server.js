const express = require('express');
const app = express();
const usuariosRoutes = require('./src/routes/usuarios');  // Importando as rotas de usuários

// Configurações
app.use(express.json());  // Permite o envio de JSON nas requisições

// Usando as rotas de usuários
app.use('/usuarios', usuariosRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

  