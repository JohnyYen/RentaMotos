"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgModule = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const pg_1 = require("pg");
const PgProvider = {
    provide: constants_1.PG_CONNECTION,
    useValue: new pg_1.Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'RentaMotos',
        password: '0403',
        port: 5432
    })
};
let PgModule = class PgModule {
};
exports.PgModule = PgModule;
exports.PgModule = PgModule = __decorate([
    (0, common_1.Module)({
        providers: [PgProvider],
        exports: [PgProvider]
    })
], PgModule);
//# sourceMappingURL=pg.module.js.map