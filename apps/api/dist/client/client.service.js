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
const pg_service_1 = require("../pg/pg.service");
let ClientService = class ClientService {
    constructor(conn, pgService) {
        this.conn = conn;
        this.pgService = pgService;
    }
    async getAllClients(pageSize = 1, page = 1) {
        const res = await this.conn.query(`SELECT * FROM cliente_view LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`);
        return res.rows;
    }
    async getClientByMun(mun) {
        const res = await this.conn.query(`SELECT * FROM cliente_view WHERE municipio = '${mun}'`);
        return res.rows;
    }
    async getClient(id) {
        const res = await this.conn.query(`SELECT * FROM cliente WHERE idcliente = '${id}'`);
        return res.rows;
    }
    async getAllClientByPDF() {
        const client = await this.pgService.execute('SELECT * FROM cliente_view');
        if (client.length === 0)
            throw new common_1.NotAcceptableException('La lista de Clientes esta vacia');
        return await (0, pdfKit_1.default)(Object.keys(client[0]), (0, jsonFormatter_1.arrayFormatter)(client));
    }
    async getAllClientPDFWorkerMun(mun) {
        const client = await this.pgService.execute(`SELECT * FROM cliente_view WHERE municipio = '${mun}'`);
        if (client.length === 0)
            throw new common_1.NotAcceptableException('La lista de clientes por municipio esta vacia');
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
        try {
            return await this.pgService.execute(`DELETE FROM cliente where id_cliente = '${id}'`);
            this.conn.query(`DELETE FROM cliente where idcliente = '${id}'`);
        }
        catch (error) {
            throw new errorHandler_1.ErrorHandler(error).returnError();
        }
    }
    async createClient(client) {
        try {
            return await this.conn.query(`INSERT INTO cliente values ('${client.idCliente}', '${client.nombre}', '${client.segNombre}', '${client.primApellido}', '${client.segApellido}', ${client.edad}, '${client.municipio}', '${client.sexo}', '${client.numCont}')`);
        }
        catch (error) {
            throw new errorHandler_1.ErrorHandler(error).returnError();
        }
    }
    async updateClient(client, id) {
        try {
            return await this.conn.query(`UPDATE cliente SET edad = ${client.edad},municipio = '${client.municipio}' ,nombre = '${client.nombre}', segNombre = '${client.segNombre}', primApellido = '${client.primApellido}', segApellido = '${client.segApellido}', numcont = '${client.numCont}'  WHERE idcliente = '${id}'`);
        }
        catch (error) {
            throw new errorHandler_1.ErrorHandler(error).returnError();
        }
    }
    async getAllBadClients() {
        const res = await this.conn.query(`SELECT * FROM clientesIncumplidores()`);
        return res.rows;
    }
    async getPDFBadClients() {
        const client = await this.pgService.execute(`SELECT * FROM clientesIncumplidores()`);
        if (client.length === 0)
            throw new common_1.NotAcceptableException('La lista de Clientes Incumplidores esta vacia');
        return await (0, pdfKit_1.default)(Object.keys(client[0]), (0, jsonFormatter_1.arrayFormatter)(client));
    }
    async getAllMun() {
        const res = await this.conn.query('select * from municipio');
        return res.rows;
    }
};
exports.ClientService = ClientService;
exports.ClientService = ClientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.PG_CONNECTION)),
    __metadata("design:paramtypes", [Object, pg_service_1.PgService])
], ClientService);
//# sourceMappingURL=client.service.js.map