"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const client_module_1 = require("./client/client.module");
const contract_module_1 = require("./contract/contract.module");
const motorcycle_module_1 = require("./motorcycle/motorcycle.module");
const pg_module_1 = require("./models/pg.module");
const model_module_1 = require("./model-moto/model.module");
const marc_module_1 = require("./marc/marc.module");
const forma_pago_module_1 = require("./forma-pago/forma-pago.module");
const user_module_1 = require("./user/user.module");
const mun_module_1 = require("./mun/mun.module");
const situation_module_1 = require("./situation/situation.module");
const pagos_module_1 = require("./pagos/pagos.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [client_module_1.ClientModule, contract_module_1.ContractModule, motorcycle_module_1.MotorcycleModule, pg_module_1.PgModule, model_module_1.ModelModule, marc_module_1.MarcModule, forma_pago_module_1.FormaPagoModule, user_module_1.UserModule, mun_module_1.MunModule, situation_module_1.SituationModule, pagos_module_1.PagosModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map