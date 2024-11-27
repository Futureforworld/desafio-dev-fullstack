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
exports.Consumo = void 0;
const typeorm_1 = require("typeorm");
const Unidade_1 = require("./Unidade");
let Consumo = (() => {
    let _classDecorators = [(0, typeorm_1.Entity)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _id_decorators;
    let _id_initializers = [];
    let _id_extraInitializers = [];
    let _consumoForaPontaEmKWH_decorators;
    let _consumoForaPontaEmKWH_initializers = [];
    let _consumoForaPontaEmKWH_extraInitializers = [];
    let _mesDoConsumo_decorators;
    let _mesDoConsumo_initializers = [];
    let _mesDoConsumo_extraInitializers = [];
    let _unidade_decorators;
    let _unidade_initializers = [];
    let _unidade_extraInitializers = [];
    var Consumo = _classThis = class {
        constructor() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.consumoForaPontaEmKWH = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _consumoForaPontaEmKWH_initializers, void 0));
            this.mesDoConsumo = (__runInitializers(this, _consumoForaPontaEmKWH_extraInitializers), __runInitializers(this, _mesDoConsumo_initializers, void 0));
            this.unidade = (__runInitializers(this, _mesDoConsumo_extraInitializers), __runInitializers(this, _unidade_initializers, void 0));
            __runInitializers(this, _unidade_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Consumo");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _consumoForaPontaEmKWH_decorators = [(0, typeorm_1.Column)()];
        _mesDoConsumo_decorators = [(0, typeorm_1.Column)()];
        _unidade_decorators = [(0, typeorm_1.ManyToOne)(() => Unidade_1.Unidade, unidade => unidade.historicoDeConsumoEmKWH)];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: obj => "id" in obj, get: obj => obj.id, set: (obj, value) => { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _consumoForaPontaEmKWH_decorators, { kind: "field", name: "consumoForaPontaEmKWH", static: false, private: false, access: { has: obj => "consumoForaPontaEmKWH" in obj, get: obj => obj.consumoForaPontaEmKWH, set: (obj, value) => { obj.consumoForaPontaEmKWH = value; } }, metadata: _metadata }, _consumoForaPontaEmKWH_initializers, _consumoForaPontaEmKWH_extraInitializers);
        __esDecorate(null, null, _mesDoConsumo_decorators, { kind: "field", name: "mesDoConsumo", static: false, private: false, access: { has: obj => "mesDoConsumo" in obj, get: obj => obj.mesDoConsumo, set: (obj, value) => { obj.mesDoConsumo = value; } }, metadata: _metadata }, _mesDoConsumo_initializers, _mesDoConsumo_extraInitializers);
        __esDecorate(null, null, _unidade_decorators, { kind: "field", name: "unidade", static: false, private: false, access: { has: obj => "unidade" in obj, get: obj => obj.unidade, set: (obj, value) => { obj.unidade = value; } }, metadata: _metadata }, _unidade_initializers, _unidade_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Consumo = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Consumo = _classThis;
})();
exports.Consumo = Consumo;
