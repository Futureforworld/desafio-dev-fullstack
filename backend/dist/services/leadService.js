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
class LeadService {
    // Criar um novo lead
    createLead(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nomeCompleto, email, telefone, unidades } = data;
            // Validar se o email já existe
            const existingLead = yield prismaClient_1.default.lead.findUnique({
                where: { email },
            });
            if (existingLead) {
                throw new Error('Email já cadastrado');
            }
            // Criar o lead e suas unidades associadas
            const lead = yield prismaClient_1.default.lead.create({
                data: {
                    nomeCompleto,
                    email,
                    telefone,
                    unidades: {
                        create: unidades,
                    },
                },
            });
            return lead;
        });
    }
    // Listar todos os leads
    listLeads(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient_1.default.lead.findMany({
                where: filters || {},
                include: { unidades: true },
            });
        });
    }
    // Buscar lead por ID
    getLeadById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prismaClient_1.default.lead.findUnique({
                where: { id },
                include: { unidades: true },
            });
        });
    }
}
exports.default = new LeadService();
