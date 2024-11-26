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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = require("multer");
var app = (0, express_1.default)();
var port = 3000;
app.use(express_1.default.json());
// Configuração do multer para upload do arquivo
var upload = (0, multer_1.default)({ dest: 'uploads/' });
// Endpoint /simular
app.post('/simular', upload.single('file'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, nomeCompleto, email, telefone, informacoesDaFatura, decodedData, lead, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                // Verifica se o arquivo foi enviado
                if (!req.file) {
                    return [2 /*return*/, res.status(400).json({ error: 'Arquivo não enviado.' })];
                }
                _a = req.body, nomeCompleto = _a.nomeCompleto, email = _a.email, telefone = _a.telefone, informacoesDaFatura = _a.informacoesDaFatura;
                if (!nomeCompleto || !email || !telefone || !informacoesDaFatura) {
                    return [2 /*return*/, res.status(400).json({ error: 'Dados incompletos.' })];
                }
                return [4 /*yield*/, decodificarContaDeEnergia(req.file)];
            case 1:
                decodedData = _b.sent();
                lead = {
                    id: 'random-id',
                    nomeCompleto: nomeCompleto,
                    email: email,
                    telefone: telefone,
                    unidades: decodedData.unidades,
                };
                // Salve o lead no banco de dados (adapte conforme seu modelo de banco)
                // await salvarLead(lead);
                return [2 /*return*/, res.status(201).json({ message: 'Simulação registrada com sucesso', lead: lead })];
            case 2:
                error_1 = _b.sent();
                console.error(error_1);
                return [2 /*return*/, res.status(500).json({ error: 'Erro interno ao registrar a simulação.' })];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Função que simula a decodificação da conta de energia
function decodificarContaDeEnergia(file) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // Aqui você faria a requisição para a API externa para decodificar o PDF
            // Use a URL do seu endpoint para consumir a conta e retornar as informações
            // Verificação simples para o tipo de arquivo
            if (file.mimetype !== 'application/pdf') {
                throw new Error('Arquivo deve ser um PDF.');
            }
            // Retorna dados simulados de exemplo (substitua pela lógica de decodificação real)
            return [2 /*return*/, {
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
                }];
        });
    });
}
app.listen(port, function () {
    console.log("Servidor rodando na porta ".concat(port));
});
