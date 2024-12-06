import { PrismaClient } from '@prisma/client';

// Inicializa o cliente Prisma
const prisma = new PrismaClient({
  log: ['query'], // Opcional: log para monitorar queries no console
});

// Conexão inicial para verificar se o banco está acessível
(async () => {
  try {
    await prisma.$connect();
    console.log('Conectado ao banco de dados com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    process.exit(1); // Encerra o processo caso ocorra erro
  }
})();

// Exporta o cliente para uso em outras partes do projeto
export default prisma;
