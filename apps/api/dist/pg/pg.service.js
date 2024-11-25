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
exports.PgService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
let PgService = class PgService {
    constructor() {
        this.pool = new pg_1.Pool({
            user: process.env.USER,
            host: process.env.HOST,
            database: process.env.DATABASE,
            password: process.env.PASSWORD,
            port: process.env.PORT
        });
    }
    async execute(query, params) {
        const client = await this.pool.connect();
        try {
            const result = await client.query(query, params);
            return result.rows;
        }
        catch (error) {
        }
        finally {
            client.release();
        }
    }
    async pagination(table, page = 1, limit = 10, orderBy = 'id', orderDirection = 'ASC') {
        const limitTable = table + ` LIMIT ${limit} OFFSET ${(page - 1) * limit}`;
        const query = `SELECT * FROM ` + limitTable;
        const response = await this.execute(query);
        return {
            data: response,
            count: await this.getTotalCount(limitTable)
        };
    }
    async getTotalCount(table) {
        const response = await this.execute(`SELECT COUNT(*) FROM ` + table);
        return response[0].count;
    }
};
exports.PgService = PgService;
exports.PgService = PgService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PgService);
//# sourceMappingURL=pg.service.js.map