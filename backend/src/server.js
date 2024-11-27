const express = require('express');
const connectToDatabase = require('./config/database');

const app = express();
const defaultPort = 3000;

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
    { nome: 'Exemplo 2', valor: 20 },
  ];
  res.json(dados);
});

// Função para encontrar uma porta livre
const findFreePort = (port, callback) => {
  const server = app.listen(port, () => {
    server.close(() => callback(port)); // Porta está livre
  });

  server.on('error', () => {
    findFreePort(port + 1, callback); // Tente a próxima porta
  });
};

// Conectar ao banco de dados e iniciar o servidor
connectToDatabase()
  .then(() => {
    findFreePort(defaultPort, (port) => {
      app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
      });
    });
  })
  .catch((err) => {
    console.error('Erro ao iniciar o servidor:', err);
  });

  useEffect(() => {
    fetch('http://localhost:3000/simular')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Erro ao buscar dados do backend:', error));
  }, []);

  const cors = require("cors");
app.use(cors());

  