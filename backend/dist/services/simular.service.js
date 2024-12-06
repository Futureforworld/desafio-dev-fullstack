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
exports.registrarNovaSimulacao = void 0;
const leadService_1 = __importDefault(require("./leadService"));
const registrarNovaSimulacao = (dados) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Dados recebidos para simulação:', dados);
        const { nomeCompleto, email, telefone, informacoesDaFatura } = dados;
        // Transformar as informações da fatura para o formato de unidades
        const unidades = informacoesDaFatura.map((fatura) => ({
            codigoDaUnidadeConsumidora: fatura.codigoDaUnidadeConsumidora,
            modeloFasico: fatura.modeloFasico,
            enquadramento: fatura.enquadramento,
            historicoDeConsumoEmKWH: fatura.historicoDeConsumoEmKWH,
        }));
        // Registrar um novo lead e suas unidades
        const lead = yield leadService_1.default.createLead({
            nomeCompleto,
            email,
            telefone,
            unidades,
        });
        return {
            mensagem: 'Simulação registrada com sucesso!',
            lead,
        };
    }
    catch (error) {
        console.error('Erro ao registrar simulação:', error);
        throw new Error('Erro ao processar a simulação');
    }
});
exports.registrarNovaSimulacao = registrarNovaSimulacao;
