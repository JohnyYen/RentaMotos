"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractModule = void 0;
const common_1 = require("@nestjs/common");
const contract_controller_1 = require("./contract.controller");
const contract_service_1 = require("./contract.service");
const pg_module_1 = require("../pg/pg.module");
const mails_module_1 = require("../mails/mails.module");
const client_module_1 = require("../client/client.module");
let ContractModule = class ContractModule {
};
exports.ContractModule = ContractModule;
exports.ContractModule = ContractModule = __decorate([
    (0, common_1.Module)({
        imports: [pg_module_1.PgModule, mails_module_1.MailsModule, client_module_1.ClientModule],
        controllers: [contract_controller_1.ContractController],
        providers: [contract_service_1.ContractService]
    })
], ContractModule);
//# sourceMappingURL=contract.module.js.map