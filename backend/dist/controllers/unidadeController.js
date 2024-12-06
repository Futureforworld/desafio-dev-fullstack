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
const prismaClient_1 = __importDefault(require("../prismaClient")); // Certifique-se de que o prismaClient está configurado corretamente
class UnidadeController {
    // Criar uma nova unidade associada a um lead
    createUnidade(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { leadId, codigoDaUnidadeConsumidora, modeloFasico, enquadramento, historicoDeConsumoEmKWH } = req.body;
                // Verificar se o lead existe
                const lead = yield prismaClient_1.default.lead.findUnique({ where: { id: leadId } });
                if (!lead) {
                    return res.status(404).json({ error: 'Lead não encontrado' });
                }
                // Validar se o histórico de consumo contém exatamente 12 meses
                if (historicoDeConsumoEmKWH.length !== 12) {
                    return res.status(400).json({ error: 'O histórico de consumo deve conter exatamente 12 meses' });
                }
                // Criar a unidade
                const unidade = yield prismaClient_1.default.unidade.create({
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
                return res.status(201).json(unidade);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Erro ao criar unidade' });
            }
        });
    }
    // Listar unidades (opcionalmente por filtros)
    listUnidades(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { leadId, codigoDaUnidadeConsumidora } = req.query;
                // Construir filtros dinamicamente
                const where = {};
                if (leadId)
                    where.leadId = String(leadId);
                if (codigoDaUnidadeConsumidora)
                    where.codigoDaUnidadeConsumidora = String(codigoDaUnidadeConsumidora);
                const unidades = yield prismaClient_1.default.unidade.findMany({
                    where,
                    include: {
                        historicoDeConsumoEmKWH: true,
                    },
                });
                return res.status(200).json(unidades);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Erro ao listar unidades' });
            }
        });
    }
    // Buscar uma unidade específica pelo ID
    getUnidadeById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const unidade = yield prismaClient_1.default.unidade.findUnique({
                    where: { id },
                    include: {
                        historicoDeConsumoEmKWH: true,
                    },
                });
                if (!unidade) {
                    return res.status(404).json({ error: 'Unidade não encontrada' });
                }
                return res.status(200).json(unidade);
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Erro ao buscar unidade' });
            }
        });
    }
}
exports.default = new UnidadeController();
