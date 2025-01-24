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
const mails_service_1 = require("../mails/mails.service");
let ContractService = class ContractService {
    constructor(conn, pgService, mailService) {
        this.conn = conn;
        this.pgService = pgService;
        this.mailService = mailService;
    }
    async getAllContract() {
        const res = await this.conn.query("SELECT * FROM contrato_view");
        return res.rows;
    }
    async getContractFilter() {
        const res = await this.conn.query('select * from contratoxmarca_modelo');
        return res.rows;
    }
    async getContractMun(mun) {
        const res = await this.conn.query(`SELECT * FROM cont_mun_view WHERE municipio = '${mun}'`);
        return res.rows;
    }
    async getCotnractByCliente(id) {
        const res = await this.conn.query(`SELECT * FROM contrato_cliente_view WHERE idcliente = '${id}'`);
        return res.rows;
    }
    async getContractByMun() {
        const res = await this.conn.query('select * from cont_mun');
        return res.rows;
    }
    async getPDFContract() {
        const contract = await this.pgService.execute(`SELECT * FROM contrato_view`);
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
            console.log(contract);
            const response = await this.conn.query(`SELECT nombre_usuario, email FROM public.usuario where id_cliente = '${contract.idCliente}'`);
            const user = response.rows[0];
            await this.conn.query(`INSERT INTO Contrato values ('${contract.idCliente}', '${contract.matricula}', '${contract.beginDate}'::date, '${contract.endDate}'::date, '${contract.firmaDate}'::date, '${contract.formaPago}', ${contract.seguro}, ${contract.diasProrroga})`);
            this.mailService.sendEmail(user.nombre_usuario, user.email);
        }
        catch (error) {
            return new errorHandler_1.ErrorHandler(error).returnError();
        }
    }
    async updateContract(contract, matricula) {
        try {
            this.conn.query(`UPDATE Contrato SET forma_pago = '${contract.formaPago}', fecha_fin = '${contract.endDate}'::date ,seguro = '${contract.seguro}', dias_prorroga = ${contract.diasProrroga} WHERE matricula = '${matricula}'`);
        }
        catch (error) {
            throw new errorHandler_1.ErrorHandler(error).returnError();
        }
    }
    async deleteContract(matricula) {
        try {
            this.conn.query(`DELETE FROM Contrato WHERE matricula = '${matricula}'`);
        }
        catch (error) {
            throw new errorHandler_1.ErrorHandler(error).returnError();
        }
    }
    async getAllFormaPago() {
        const res = await this.conn.query('SELECT * FROM formaPago');
        return res.rows;
    }
    async createFormaPago(formaPago) {
        try {
            await this.conn.query(`INSERT INTO formaPago values ('${formaPago.formaPago}')`);
        }
        catch (error) {
            throw new errorHandler_1.ErrorHandler(error).returnError();
        }
    }
    async deleteFormaPago(formaPago) {
        try {
            await this.conn.query(`DELETE FROM formaPago WHERE formaPago = '${formaPago}'`);
        }
        catch (error) {
            throw new errorHandler_1.ErrorHandler(error).returnError();
        }
    }
    async updateFormaPago(formaPago, changeFormaPago) {
        try {
            await this.conn.query(`UPDATE formaPago SET formaPago = '${formaPago.formaPago}' WHERE formapago = '${changeFormaPago}'`);
        }
        catch (error) {
            throw new errorHandler_1.ErrorHandler(error).returnError();
        }
    }
    async getAllPagos() {
        const res = await this.conn.query('SELECT * FROM pagos_view');
        return res.rows;
    }
    async getAllPagosByMun(mun) {
        const res = await this.conn.query(`SELECT * FROM pagos_mun_view WHERE municipio = '${mun}'`);
        return res.rows;
    }
    async getAllPagosPDF() {
        const list = await this.getAllPagos();
        let counter = 0;
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
    __metadata("design:paramtypes", [Object, pg_service_1.PgService,
        mails_service_1.MailsService])
], ContractService);
//# sourceMappingURL=contract.service.js.map