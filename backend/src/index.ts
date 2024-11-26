import express from 'express';
import multer from 'multer';
import { Lead, SolicitarSimulacaoDeCompensacaoEnergeticaInput, InformacaoDaFatura } from './models'; // Ajuste conforme seu modelo

const app = express();
const port = 3000;

app.use(express.json());

// Configuração do multer para upload do arquivo
const upload = multer({ dest: 'uploads/' });

// Endpoint /simular
app.post('/simular', upload.single('file'), async (req, res) => {
  try {
    // Verifica se o arquivo foi enviado
    if (!req.file) {
      return res.status(400).json({ error: 'Arquivo não enviado.' });
    }

    // Verificação de dados no corpo da requisição
    const { nomeCompleto, email, telefone, informacoesDaFatura }: SolicitarSimulacaoDeCompensacaoEnergeticaInput = req.body;

    if (!nomeCompleto || !email || !telefone || !informacoesDaFatura) {
      return res.status(400).json({ error: 'Dados incompletos.' });
    }

    console.log(req.file); // Verifique se o arquivo está sendo carregado corretamente

    // Simulação do processo de decodificação da conta de energia (use a API real aqui)
    const decodedData = await decodificarContaDeEnergia(req.file); // Função que você vai implementar

    // Criação do Lead (simulação)
    const lead: Lead = {
      id: 'random-id',
      nomeCompleto,
      email,
      telefone,
      unidades: decodedData.unidades,
    };

    // Salve o lead no banco de dados (adapte conforme seu modelo de banco)
    // await salvarLead(lead);

    return res.status(201).json({ message: 'Simulação registrada com sucesso', lead });
  } catch (error) {
    console.error('Erro interno:', error); // Adicione mais detalhes para depuração
    return res.status(500).json({ error: 'Erro interno ao registrar a simulação.' });
  }
});

// Função que simula a decodificação da conta de energia
async function decodificarContaDeEnergia(file: Express.Multer.File): Promise<any> {
  // Aqui você faria a requisição para a API externa para decodificar o PDF
  // Use a URL do seu endpoint para consumir a conta e retornar as informações

  // Verificação simples para o tipo de arquivo
  if (file.mimetype !== 'application/pdf') {
    throw new Error('Arquivo deve ser um PDF.');
  }

  // Retorna dados simulados de exemplo (substitua pela lógica de decodificação real)
  return {
    unidades: [
      {
        id: 'unidade-id',
        codigoDaUnidadeConsumidora: '12345',
        modeloFasico: 'monofasico',
        enquadramento: 'AX',
        historicoDeConsumoEmKWH: [
          { consumoForaPontaEmKWH: 100, mesDoConsumo: new Date('2023-01-01') },
          { consumoForaPontaEmKWH: 120, mesDoConsumo: new Date('2023-02-01') },
        ],
      },
    ],
  };
}

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
