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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarcService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
let MarcService = class MarcService {
    constructor(conn) {
        this.conn = conn;
    }
    async getMarc() {
        const res = await this.conn.query('SELECT nommarca FROM marca');
        return res.rows;
    }
    async deleteMarc(marc) {
        await this.conn.query(`DELETE FROM marca WHERE nommarca = '${marc}'`);
    }
    async createMarc(nommarca) {
        await this.conn.query(`INSERT INTO marca VALUES ('${nommarca.nommarca}')`);
    }
    async updateMarc(marc, id) {
        await this.conn.query(`UPDATE marca SET nommarca = '${marc.nommarca}' WHERE nommarca = '${id}'`);
    }
};
exports.MarcService = MarcService;
exports.MarcService = MarcService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.PG_CONNECTION)),
    __metadata("design:paramtypes", [Object])
], MarcService);
//# sourceMappingURL=marc.service.js.map