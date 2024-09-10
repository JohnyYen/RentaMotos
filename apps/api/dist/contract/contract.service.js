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
let ContractService = class ContractService {
    constructor(conn) {
        this.conn = conn;
    }
    async getAllContract() {
        const res = await this.conn.query("SELECT * FROM contrato_view");
        return res.rows;
    }
    async getContractFilter() {
        const res = await this.conn.query('SELECT contratoxmarcamodelo()');
        return res.rows;
    }
    async getContractMun(mun) {
        console.log(mun);
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
        const contract = await this.getAllContract();
        return await (0, pdfKit_1.default)(Object.keys(contract[0]), (0, jsonFormatter_1.arrayFormatter)(contract));
    }
    async getPDFContractXModelo() {
        const contract = await this.getContractFilter();
        return await (0, pdfKit_1.default)(Object.keys(contract[0]), (0, jsonFormatter_1.arrayFormatter)(contract));
    }
    async getPDFContractByMun() {
        const contract = await this.getContractByMun();
        return await (0, pdfKit_1.default)(Object.keys(contract[0]), (0, jsonFormatter_1.arrayFormatter)(contract));
    }
    async createContract(contract) {
        console.log(contract);
        await this.conn.query(`INSERT INTO Contrato values ('${contract.idCliente}', '${contract.matricula}', '${contract.beginDate}'::date, '${contract.endDate}'::date, '${contract.firmaDate}'::date, '${contract.formaPago}', ${contract.seguro}, ${contract.diasProrroga})`);
    }
    updateContract(contract, idCliente, matricula) {
        this.conn.query(`UPDATE Contrato SET formapago = ${contract.formaPago}, seguro = ${contract.seguro}, diasprorroga = ${contract.diasProrroga} WHERE idcliente = ${idCliente} AND matricula = ${matricula}`);
    }
    deleteContract(idCliente, matricula) {
        this.conn.query(`DELETE FROM Contrato where idcliente = '${idCliente} and matricula = '${matricula}'`);
    }
};
exports.ContractService = ContractService;
exports.ContractService = ContractService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.PG_CONNECTION)),
    __metadata("design:paramtypes", [Object])
], ContractService);
//# sourceMappingURL=contract.service.js.map