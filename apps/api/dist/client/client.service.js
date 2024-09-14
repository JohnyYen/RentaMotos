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
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const pdfKit_1 = require("../libs/pdfKit");
const jsonFormatter_1 = require("../libs/jsonFormatter");
const errorHandler_1 = require("../libs/errorHandler");
let ClientService = class ClientService {
    constructor(conn) {
        this.conn = conn;
    }
    async getAllClients() {
        const res = await this.conn.query('SELECT * FROM cliente_view');
        return res.rows;
    }
    async getClientByMun(mun) {
        const res = await this.conn.query(`SELECT * FROM cliente_view WHERE municipio = '${mun}'`);
        return res.rows;
    }
    async getClient(id) {
        const res = await this.conn.query(`SELECT * FROM cliente WHERE idcliente = '${id}'`);
        console.log(res.rows);
        return res.rows;
    }
    async getAllClientByPDF() {
        const client = await this.getAllClients();
        return await (0, pdfKit_1.default)(Object.keys(client[0]), (0, jsonFormatter_1.arrayFormatter)(client));
    }
    async getAllClientPDFWorkerMun(mun) {
        const client = await this.getClientByMun(mun);
        return await (0, pdfKit_1.default)(Object.keys(client[0]), (0, jsonFormatter_1.arrayFormatter)(client));
    }
    async validatePhoneNumber(num) {
        try {
            const res = await this.conn.query(`SELECT * FROM cliente WHERE numcont = '${num}'`);
            return res.rows.length !== 0;
        }
        catch (error) {
            throw new errorHandler_1.ErrorHandler(error);
        }
    }
    async deleteClient(id) {
        this.conn.query(`DELETE FROM cliente where idcliente = '${id}'`);
    }
    async createClient(client) {
        this.conn.query(`INSERT INTO cliente values ('${client.idCliente}', '${client.nombre}', '${client.segNombre}', '${client.primApellido}', '${client.segApellido}', ${client.edad}, '${client.municipio}', '${client.sexo}', '${client.numcont}')`);
    }
    async updateClient(client, id) {
        this.conn.query(`UPDATE cliente SET edad = ${client.edad},municipio = '${client.municipio}' ,nombre = '${client.nombre}', segNombre = '${client.segNombre}', primApellido = '${client.primApellido}', segApellido = '${client.segApellido}', numcont = '${client.numcont}'  WHERE idcliente = '${id}'`);
    }
    async getAllBadClients() {
        const res = await this.conn.query(`SELECT * FROM clientesIncumplidores()`);
        return res.rows;
    }
    async getPDFBadClients() {
        const client = await this.getAllBadClients();
        return await (0, pdfKit_1.default)(Object.keys(client[0]), (0, jsonFormatter_1.arrayFormatter)(client));
    }
};
exports.ClientService = ClientService;
exports.ClientService = ClientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.PG_CONNECTION)),
    __metadata("design:paramtypes", [Object])
], ClientService);
//# sourceMappingURL=client.service.js.map