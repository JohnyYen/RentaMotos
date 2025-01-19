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
const pg_service_1 = require("../pg/pg.service");
const errorHandler_1 = require("../libs/errorHandler");
let MotorcycleService = class MotorcycleService {
    constructor(conn, pgService) {
        this.conn = conn;
        this.pgService = pgService;
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
        if (moto.length === 0)
            throw new common_1.NotAcceptableException('La lista de motos esta vacia');
        return await (0, pdfKit_1.default)(Object.keys(moto[0]), (0, jsonFormatter_1.arrayFormatter)(moto));
    }
    async getSituation() {
        const res = await this.conn.query('SELECT * FROM situacion');
        return res.rows;
    }
    async getPDFSituation() {
        const moto = await this.getSituationMoto();
        if (moto.length === 0)
            throw new common_1.NotAcceptableException('La lista de la situacion de las motos esta vacia');
        return await (0, pdfKit_1.default)(Object.keys(moto[0]), (0, jsonFormatter_1.arrayFormatter)(moto));
    }
    async deleteMotorcycle(id) {
        try {
            await this.conn.query(`DELETE FROM moto WHERE matricula = '${id}'`);
        }
        catch (error) {
            throw new errorHandler_1.ErrorHandler(error).returnError();
        }
    }
    async getMarc() {
        const res = await this.conn.query('SELECT nom_marca FROM marca');
        return res.rows;
    }
    async deleteMarc(marc) {
        try {
            await this.conn.query(`DELETE FROM marca WHERE id_marca = '${marc}'`);
        }
        catch (error) {
            throw new errorHandler_1.ErrorHandler(error).returnError();
        }
    }
    async createMarc(marca) {
        try {
            await this.conn.query(`INSERT INTO marca VALUES ('${marca.nomMarca}')`);
        }
        catch (error) {
            throw new errorHandler_1.ErrorHandler(error).returnError();
        }
    }
    async updateMarc(marc, id) {
        try {
            await this.conn.query(`UPDATE marca SET nom_marca = '${marc.nomMarca}' WHERE id_marca = '${id}'`);
        }
        catch (error) {
            return new errorHandler_1.ErrorHandler(error).returnError();
        }
    }
    async createMotorcycle(moto) {
        try {
            return await this.conn.query(`INSERT INTO moto values ('${moto.matricula}', '${moto.color}', ${moto.cantKm}, '${moto.marca}', '${moto.modelo}', '${moto.situacion}')`);
        }
        catch (error) {
            throw new errorHandler_1.ErrorHandler(error).returnError();
        }
    }
    async updateMotorcycle(moto, id) {
        try {
            this.conn.query(`UPDATE moto SET cant_km = ${moto.cantKm}, color = '${moto.color}', situacion = '${moto.situacion}' WHERE matricula = '${id}'`);
        }
        catch (error) {
            throw new errorHandler_1.ErrorHandler(error).returnError();
        }
    }
    async getSituationMoto() {
        const res = await this.conn.query('SELECT * FROM SituacionMoto()');
        return res.rows;
    }
    async getModels() {
        const res = await this.conn.query('SELECT * FROM modelo');
        return res.rows;
    }
    async deleteModels(id) {
        try {
            await this.conn.query(`DELETE FROM modelo WHERE id_modelo = '${id}'`);
        }
        catch (error) {
            throw new errorHandler_1.ErrorHandler(error).returnError();
        }
    }
    async createModels(model) {
        try {
            await this.conn.query(`INSERT INTO modelo values ('${model.nomModelo}' , '${model.nomMarca}')`);
        }
        catch (error) {
            throw new errorHandler_1.ErrorHandler(error).returnError();
        }
    }
    async updateModel(model, id) {
        try {
            this.conn.query(`UPDATE modelo SET nom_modelo = '${model.nomModelo}' WHERE id_modelo = '${id}'`);
        }
        catch (error) {
            throw new errorHandler_1.ErrorHandler(error).returnError();
        }
    }
};
exports.MotorcycleService = MotorcycleService;
exports.MotorcycleService = MotorcycleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.PG_CONNECTION)),
    __metadata("design:paramtypes", [Object, pg_service_1.PgService])
], MotorcycleService);
//# sourceMappingURL=motorcycle.service.js.map