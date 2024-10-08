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
exports.PagosService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const jsonFormatter_1 = require("../libs/jsonFormatter");
const pdfKit_1 = require("../libs/pdfKit");
let PagosService = class PagosService {
    constructor(conn) {
        this.conn = conn;
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
        console.log(list);
        for (const e of Object.values(list[0])) {
            if (e === null)
                counter++;
        }
        console.log(list);
        console.log(counter);
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
exports.PagosService = PagosService;
exports.PagosService = PagosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.PG_CONNECTION)),
    __metadata("design:paramtypes", [Object])
], PagosService);
//# sourceMappingURL=pagos.service.js.map