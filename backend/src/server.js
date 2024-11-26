const express = require('express');
const connectToDatabase = require('./config/database');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());

// Rota de exemplo
app.get('/', (req, res) => {
  res.send('API funcionando!');
});

// Nova rota para "/simular"
app.get('/simular', (req, res) => {
  // Simulação de dados de resposta
  const dados = [
    { nome: 'Exemplo 1', valor: 10 },
    { nome: 'Exemplo 2', valor: 20 }
  ];
  res.json(dados);
});

// Conectar ao banco de dados e iniciar o servidor
connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao iniciar o servidor:', err);
  });
