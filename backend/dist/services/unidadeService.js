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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../prismaClient"));
class UnidadeService {
    // Criar uma nova unidade
    createUnidade(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { leadId, codigoDaUnidadeConsumidora, modeloFasico, enquadramento, historicoDeConsumoEmKWH } = data;
            // Verificar se o lead existe
            const lead = yield prismaClient_1.default.lead.findUnique({
                where: { id: leadId },
            });
            if (!lead) {
                throw new Error('Lead não encontrado');
            }
            // Validar se o histórico de consumo tem exatamente 12 meses
            if (historicoDeConsumoEmKWH.length !== 12) {
                throw new Error('O histórico de consumo deve conter exatamente 12 meses');
            }
            // Criar a unidade
            return prismaClient_1.default.unidade.create({
                data: {
                    leadId,
                    codigoDaUnidadeConsumidora,
                    modeloFasico,
                    enquadramento,
                    historicoDeConsumoEmKWH: {
                        createMany: {
                            data: historicoDeConsumoEmKWH,
                        },
                    },
                },
            });
        });
    }
    // Listar todas as unidades
    listUnidades(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient_1.default.unidade.findMany({
                where: filters || {},
                include: { historicoDeConsumoEmKWH: true },
            });
        });
    }
    // Buscar unidade por ID
    getUnidadeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient_1.default.unidade.findUnique({
                where: { id },
                include: { historicoDeConsumoEmKWH: true },
            });
        });
    }
}
exports.default = new UnidadeService();
