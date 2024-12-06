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
// backend/routes/simulacoes.ts
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
// Inicialize o roteador
const router = (0, express_1.Router)();
// Configuração do multer para upload do arquivo
const upload = (0, multer_1.default)({ dest: 'uploads/' });
// Defina o endpoint POST
router.post('/', upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Requisição recebida:', req.body);
        console.log('Arquivo recebido:', req.file);
        if (!req.file) {
            return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
        }
        // Lógica para processar a requisição e gerar a resposta
        return res.status(200).json({ message: 'Simulação registrada com sucesso!' });
    }
    catch (error) {
        console.error('Erro no processamento:', error);
        return res.status(500).json({ error: 'Erro interno ao registrar a simulação.' });
    }
}));
// Exporte a rota
exports.default = router;
