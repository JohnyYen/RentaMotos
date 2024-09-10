"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MotorcycleModule = void 0;
const common_1 = require("@nestjs/common");
const motorcycle_controller_1 = require("./motorcycle.controller");
const motorcycle_service_1 = require("./motorcycle.service");
const pg_module_1 = require("../models/pg.module");
let MotorcycleModule = class MotorcycleModule {
};
exports.MotorcycleModule = MotorcycleModule;
exports.MotorcycleModule = MotorcycleModule = __decorate([
    (0, common_1.Module)({
        imports: [pg_module_1.PgModule],
        controllers: [motorcycle_controller_1.MotorcycleController],
        providers: [motorcycle_service_1.MotorcycleService]
    })
], MotorcycleModule);
//# sourceMappingURL=motorcycle.module.js.map