"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unidade = void 0;
const typeorm_1 = require("typeorm");
const Lead_1 = require("./Lead");
const Consumo_1 = require("./Consumo");
let Unidade = class Unidade {
};
exports.Unidade = Unidade;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Unidade.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Unidade.prototype, "codigoDaUnidadeConsumidora", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Unidade.prototype, "modeloFasico", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Unidade.prototype, "enquadramento", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Lead_1.Lead, lead => lead.unidades),
    __metadata("design:type", Lead_1.Lead)
], Unidade.prototype, "lead", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Consumo_1.Consumo, consumo => consumo.unidade, { cascade: true }),
    __metadata("design:type", Array)
], Unidade.prototype, "historicoDeConsumoEmKWH", void 0);
exports.Unidade = Unidade = __decorate([
    (0, typeorm_1.Entity)()
], Unidade);
