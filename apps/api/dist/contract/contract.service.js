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
exports.ContractService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const pdfKit_1 = require("../libs/pdfKit");
const jsonFormatter_1 = require("../libs/jsonFormatter");
const errorHandler_1 = require("../libs/errorHandler");
const pg_service_1 = require("../pg/pg.service");
let ContractService = class ContractService {
    constructor(conn, pgService) {
        this.conn = conn;
        this.pgService = pgService;
    }
    async getAllContract() {
        return await this.pgService.pagination(`contrato_view`);
        const res = await this.conn.query("SELECT * FROM contrato_view");
        return res.rows;
    }
    async getContractFilter() {
        return await this.pgService.pagination(`contratoxmarca_modelo`);
        const res = await this.conn.query('select * from contratoxmarca_modelo');
        return res.rows;
    }
    async getContractMun(mun) {
        return await this.pgService.pagination(`cont_mun_view WHERE municipio = '${mun}'`);
        const res = await this.conn.query(`SELECT * FROM cont_mun_view WHERE municipio = '${mun}'`);
        return res.rows;
    }
    async getCotnractByCliente(id) {
        return await this.pgService.pagination(`contrato_cliente_view WHERE idcliente = '${id}'`);
        const res = await this.conn.query(`SELECT * FROM contrato_cliente_view WHERE idcliente = '${id}'`);
        return res.rows;
    }
    async getContractByMun() {
        return await this.pgService.pagination(`cont_mun`);
        const res = await this.conn.query('select * from cont_mun');
        return res.rows;
    }
    async getPDFContract() {
        const contract = await this.pgService.execute(`SELECT * FROM contrato_view`);
        if (contract.length === 0)
            throw new common_1.BadRequestException('La lista de contratos esta vacia');
        return await (0, pdfKit_1.default)(Object.keys(contract[0]), (0, jsonFormatter_1.arrayFormatter)(contract));
    }
    async getPDFContractXModelo() {
        const contract = await this.pgService.execute(`select * from contratoxmarca_modelo`);
        if (contract.length === 0)
            throw new common_1.NotAcceptableException('La lista de contratos por marca y modelo esta vacia');
        return await (0, pdfKit_1.default)(Object.keys(contract[0]), (0, jsonFormatter_1.arrayFormatter)(contract));
    }
    async getPDFContractWorkerMun(mun) {
        const contract = await this.pgService.execute(`SELECT * FROM cont_mun_view WHERE municipio = '${mun}'`);
        if (contract.length === 0)
            throw new common_1.NotAcceptableException('La lista de contratos por municipio esta vacia');
        return await (0, pdfKit_1.default)(Object.keys(contract[0]), (0, jsonFormatter_1.arrayFormatter)(contract));
    }
    async getPDFContractByMun() {
        const contract = await this.pgService.execute(`select * from cont_mun`);
        if (contract.length === 0)
            throw new common_1.NotAcceptableException('La lista de contratos por municipio esta vacia');
        return await (0, pdfKit_1.default)(Object.keys(contract[0]), (0, jsonFormatter_1.arrayFormatter)(contract));
    }
    async createContract(contract) {
        try {
            return await this.pgService.execute(`INSERT INTO Contrato values ('${contract.idCliente}', '${contract.matricula}', '${contract.beginDate}'::date, '${contract.endDate}'::date, '${contract.firmaDate}'::date, '${contract.formaPago}', ${contract.seguro}, ${contract.diasProrroga})`);
            await this.conn.query(`INSERT INTO Contrato values ('${contract.idCliente}', '${contract.matricula}', '${contract.beginDate}'::date, '${contract.endDate}'::date, '${contract.firmaDate}'::date, '${contract.formaPago}', ${contract.seguro}, ${contract.diasProrroga})`);
        }
        catch (error) {
            return new errorHandler_1.ErrorHandler(error).returnError();
        }
    }
    async updateContract(contract, matricula) {
        try {
            return await this.pgService.execute(`UPDATE Contrato SET formapago = '${contract.formaPago}', fechafin = '${contract.endDate}'::date ,seguro = '${contract.seguro}', diasprorroga = ${contract.diasProrroga} WHERE matricula = '${matricula}'`);
            this.conn.query(`UPDATE Contrato SET formapago = '${contract.formaPago}', fechafin = '${contract.endDate}'::date ,seguro = '${contract.seguro}', diasprorroga = ${contract.diasProrroga} WHERE matricula = '${matricula}'`);
        }
        catch (error) {
            throw new errorHandler_1.ErrorHandler(error).returnError();
        }
    }
    async deleteContract(matricula) {
        try {
            return await this.pgService.execute(`DELETE FROM Contrato WHERE matricula = '${matricula}'`);
            this.conn.query(`DELETE FROM Contrato WHERE matricula = '${matricula}'`);
        }
        catch (error) {
            throw new errorHandler_1.ErrorHandler(error).returnError();
        }
    }
    async getAllFormaPago() {
        return await this.pgService.execute('SELECT * FROM formaPago');
        const res = await this.conn.query('SELECT * FROM formaPago');
        return res.rows;
    }
    async createFormaPago(formaPago) {
        try {
            return await this.pgService.execute(`INSERT INTO formaPago values ('${formaPago.formaPago}')`);
            await this.conn.query(`INSERT INTO formaPago values ('${formaPago.formaPago}')`);
        }
        catch (error) {
            throw new errorHandler_1.ErrorHandler(error).returnError();
        }
    }
    async deleteFormaPago(formaPago) {
        try {
            return await this.pgService.execute(`DELETE FROM formaPago WHERE formaPago = '${formaPago}'`);
            await this.conn.query(`DELETE FROM formaPago WHERE formaPago = '${formaPago}'`);
        }
        catch (error) {
            throw new errorHandler_1.ErrorHandler(error).returnError();
        }
    }
    async updateFormaPago(formaPago, changeFormaPago) {
        try {
            return await this.pgService.execute(`UPDATE formaPago SET formaPago = '${formaPago.formaPago}' WHERE formapago = '${changeFormaPago}'`);
            await this.conn.query(`UPDATE formaPago SET formaPago = '${formaPago.formaPago}' WHERE formapago = '${changeFormaPago}'`);
        }
        catch (error) {
            throw new errorHandler_1.ErrorHandler(error).returnError();
        }
    }
    async getAllPagos() {
        console.log(this.pgService.execute(`'SELECT * FROM pagos_view'`));
        return await this.pgService.execute('pagos_view');
        const res = await this.conn.query('SELECT * FROM pagos_view');
        return res.rows;
    }
    async getAllPagosByMun(mun) {
        return await this.pgService.execute(`SELECT * FROM pagos_mun_view WHERE municipio = '${mun}'`);
        const res = await this.conn.query(`SELECT * FROM pagos_mun_view WHERE municipio = '${mun}'`);
        return res.rows;
    }
    async getAllPagosPDF() {
        const list = await this.getAllPagos();
        let counter = 0;
        console.log(list);
        for (const e of Object.values(list[0])) {
            if (e === null)
                counter++;
        }
        if (counter === 13)
            throw new common_1.NotAcceptableException('La lista de Pagos esta vacia');
        else
            return await (0, pdfKit_1.default)(Object.keys(list[0]), (0, jsonFormatter_1.arrayFormatter)(list));
    }
    async getAllPagosByPDF(mun) {
        const list = await this.getAllPagosByMun(mun);
        if (list.length === 0)
            throw new common_1.NotAcceptableException('La lista de Pagos esta vacia');
        else
            return await (0, pdfKit_1.default)(Object.keys(list[0]), (0, jsonFormatter_1.arrayFormatter)(list));
    }
};
exports.ContractService = ContractService;
exports.ContractService = ContractService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.PG_CONNECTION)),
    __metadata("design:paramtypes", [Object, pg_service_1.PgService])
], ContractService);
//# sourceMappingURL=contract.service.js.map