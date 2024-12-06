"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
// Inicializa o cliente Prisma
const prisma = new client_1.PrismaClient({
    log: ['query'], // Opcional: log para monitorar queries no console
});
// Conexão inicial para verificar se o banco está acessível
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.$connect();
        console.log('Conectado ao banco de dados com sucesso!');
    }
    catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        process.exit(1); // Encerra o processo caso ocorra erro
    }
}))();
// Exporta o cliente para uso em outras partes do projeto
exports.default = prisma;