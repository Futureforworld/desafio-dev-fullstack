"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unidade = void 0;
const typeorm_1 = require("typeorm");
const Lead_1 = require("./Lead");
const Consumo_1 = require("./Consumo");
let Unidade = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _codigoDaUnidadeConsumidora_decorators;
    let _codigoDaUnidadeConsumidora_initializers = [];
    let _codigoDaUnidadeConsumidora_extraInitializers = [];
    let _modeloFasico_decorators;
    let _modeloFasico_initializers = [];
    let _modeloFasico_extraInitializers = [];
    let _enquadramento_decorators;
    let _enquadramento_initializers = [];
    let _enquadramento_extraInitializers = [];
    let _lead_decorators;
    let _lead_initializers = [];
    let _lead_extraInitializers = [];
    let _historicoDeConsumoEmKWH_decorators;
    let _historicoDeConsumoEmKWH_initializers = [];
    let _historicoDeConsumoEmKWH_extraInitializers = [];
    var Unidade = _classThis = class {
        constructor() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.codigoDaUnidadeConsumidora = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _codigoDaUnidadeConsumidora_initializers, void 0));
            this.modeloFasico = (__runInitializers(this, _codigoDaUnidadeConsumidora_extraInitializers), __runInitializers(this, _modeloFasico_initializers, void 0));
            this.enquadramento = (__runInitializers(this, _modeloFasico_extraInitializers), __runInitializers(this, _enquadramento_initializers, void 0));
            this.lead = (__runInitializers(this, _enquadramento_extraInitializers), __runInitializers(this, _lead_initializers, void 0));
            this.historicoDeConsumoEmKWH = (__runInitializers(this, _lead_extraInitializers), __runInitializers(this, _historicoDeConsumoEmKWH_initializers, void 0));
            __runInitializers(this, _historicoDeConsumoEmKWH_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Unidade");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _codigoDaUnidadeConsumidora_decorators = [(0, typeorm_1.Column)({ unique: true })];
        _modeloFasico_decorators = [(0, typeorm_1.Column)()];
        _enquadramento_decorators = [(0, typeorm_1.Column)()];
        _lead_decorators = [(0, typeorm_1.ManyToOne)(() => Lead_1.Lead, lead => lead.unidades)];
        _historicoDeConsumoEmKWH_decorators = [(0, typeorm_1.OneToMany)(() => Consumo_1.Consumo, consumo => consumo.unidade, { cascade: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _codigoDaUnidadeConsumidora_decorators, { kind: "field", name: "codigoDaUnidadeConsumidora", static: false, private: false, access: { has: obj => "codigoDaUnidadeConsumidora" in obj, get: obj => obj.codigoDaUnidadeConsumidora, set: (obj, value) => { obj.codigoDaUnidadeConsumidora = value; } }, metadata: _metadata }, _codigoDaUnidadeConsumidora_initializers, _codigoDaUnidadeConsumidora_extraInitializers);
        __esDecorate(null, null, _modeloFasico_decorators, { kind: "field", name: "modeloFasico", static: false, private: false, access: { has: obj => "modeloFasico" in obj, get: obj => obj.modeloFasico, set: (obj, value) => { obj.modeloFasico = value; } }, metadata: _metadata }, _modeloFasico_initializers, _modeloFasico_extraInitializers);
        __esDecorate(null, null, _enquadramento_decorators, { kind: "field", name: "enquadramento", static: false, private: false, access: { has: obj => "enquadramento" in obj, get: obj => obj.enquadramento, set: (obj, value) => { obj.enquadramento = value; } }, metadata: _metadata }, _enquadramento_initializers, _enquadramento_extraInitializers);
        __esDecorate(null, null, _lead_decorators, { kind: "field", name: "lead", static: false, private: false, access: { has: obj => "lead" in obj, get: obj => obj.lead, set: (obj, value) => { obj.lead = value; } }, metadata: _metadata }, _lead_initializers, _lead_extraInitializers);
        __esDecorate(null, null, _historicoDeConsumoEmKWH_decorators, { kind: "field", name: "historicoDeConsumoEmKWH", static: false, private: false, access: { has: obj => "historicoDeConsumoEmKWH" in obj, get: obj => obj.historicoDeConsumoEmKWH, set: (obj, value) => { obj.historicoDeConsumoEmKWH = value; } }, metadata: _metadata }, _historicoDeConsumoEmKWH_initializers, _historicoDeConsumoEmKWH_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Unidade = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Unidade = _classThis;
})();
exports.Unidade = Unidade;
