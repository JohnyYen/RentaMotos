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
exports.MotorcycleService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const jsonFormatter_1 = require("../libs/jsonFormatter");
const pdfKit_1 = require("../libs/pdfKit");
let MotorcycleService = class MotorcycleService {
    constructor(conn) {
        this.conn = conn;
    }
    async getAllMotorcycle() {
        const res = await this.conn.query("SELECT * FROM moto_view");
        return await res.rows;
    }
    async getMotoClient() {
        const res = await this.conn.query("SELECT * FROM moto_view WHERE situacion = 'Disponible'");
        return res.rows;
    }
    async getPDF() {
        const moto = await this.getAllMotorcycle();
        return await (0, pdfKit_1.default)(Object.keys(moto[0]), (0, jsonFormatter_1.arrayFormatter)(moto));
    }
    async getPDFSituation() {
        const moto = await this.getSituationMoto();
        return await (0, pdfKit_1.default)(Object.keys(moto[0]), (0, jsonFormatter_1.arrayFormatter)(moto));
    }
    async deleteMotorcycle(id) {
        await this.conn.query(`DELETE FROM moto WHERE moto.matricula = '${id}'`);
    }
    async createMotorcycle(moto) {
        await this.conn.query(`INSERT INTO moto values ('${moto.matricula}', '${moto.color}', ${moto.cantKm}, '${moto.marca}', '${moto.modelo}', '${moto.situacion}')`);
    }
    async updateMotorcycle(moto, id) {
        this.conn.query(`UPDATE moto SET cantkm = ${moto.cantKm}, color = '${moto.color}', situacion = '${moto.situacion}' WHERE matricula = '${id}'`);
    }
    async getSituationMoto() {
        const res = await this.conn.query('SELECT * FROM SituacionMoto()');
        return res.rows;
    }
};
exports.MotorcycleService = MotorcycleService;
exports.MotorcycleService = MotorcycleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.PG_CONNECTION)),
    __metadata("design:paramtypes", [Object])
], MotorcycleService);
//# sourceMappingURL=motorcycle.service.js.map