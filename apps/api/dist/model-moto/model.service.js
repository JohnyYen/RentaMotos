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
exports.ModelService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
let ModelService = class ModelService {
    constructor(conn) {
        this.conn = conn;
    }
    async getModels() {
        const res = await this.conn.query('SELECT * FROM modelo');
        return res.rows;
    }
    async deleteModels(nomModelo) {
        await this.conn.query(`DELETE FROM modelo WHERE nommodelo = '${nomModelo}'`);
    }
    async createModels(model) {
        await this.conn.query(`INSERT INTO modelo values ('${model.nomModelo}' , '${model.nomMarca}')`);
    }
};
exports.ModelService = ModelService;
exports.ModelService = ModelService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.PG_CONNECTION)),
    __metadata("design:paramtypes", [Object])
], ModelService);
//# sourceMappingURL=model.service.js.map