"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormaPagoModule = void 0;
const common_1 = require("@nestjs/common");
const forma_pago_controller_1 = require("./forma-pago.controller");
const forma_pago_service_1 = require("./forma-pago.service");
const pg_module_1 = require("../models/pg.module");
let FormaPagoModule = class FormaPagoModule {
};
exports.FormaPagoModule = FormaPagoModule;
exports.FormaPagoModule = FormaPagoModule = __decorate([
    (0, common_1.Module)({
        imports: [pg_module_1.PgModule],
        controllers: [forma_pago_controller_1.FormaPagoController],
        providers: [forma_pago_service_1.FormaPagoService]
    })
], FormaPagoModule);
//# sourceMappingURL=forma-pago.module.js.map