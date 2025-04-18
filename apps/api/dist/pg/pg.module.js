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
const pg_service_1 = require("./pg.service");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });
const TYPE_DATE = 1082;
pg_1.types.setTypeParser(TYPE_DATE, date => date);
const PgProvider = {
    provide: constants_1.PG_CONNECTION,
    useValue: new pg_1.Pool({
        user: process.env.USER,
        host: process.env.HOST,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: process.env.PORT
    })
};
let PgModule = class PgModule {
};
exports.PgModule = PgModule;
exports.PgModule = PgModule = __decorate([
    (0, common_1.Module)({
        providers: [PgProvider, pg_service_1.PgService],
        exports: [PgProvider, pg_service_1.PgService]
    })
], PgModule);
//# sourceMappingURL=pg.module.js.map