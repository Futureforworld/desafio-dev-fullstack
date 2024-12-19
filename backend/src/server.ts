import express from 'express';
import cors from 'cors';
import path from 'path';
import upload from './upload';  // Importa o middleware de upload

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));  // Torna os arquivos acessíveis na URL

// Rota de simulação para lidar com o upload
app.post('/simulacao', upload.single('file'), (req, res) => {
  console.log(req.file);  // Aqui você pode acessar o arquivo enviado
  res.json({
    mensagem: 'Simulação realizada com sucesso!',
  });
});

// Rota padrão para erros 404
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada.' });
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});


