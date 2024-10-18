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
exports.PagosController = void 0;
const common_1 = require("@nestjs/common");
const pagos_service_1 = require("./pagos.service");
const swagger_1 = require("@nestjs/swagger");
let PagosController = class PagosController {
    constructor(pagosService) {
        this.pagosService = pagosService;
    }
    async getAllPagos() {
        return await this.pagosService.getAllPagos();
    }
    async getAllPagosPDF(res) {
        const buffer = await this.pagosService.getAllPagosPDF();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Importe.pdf');
        res.setHeader('Content-Length', buffer.length);
        res.send(buffer);
    }
    async getAllPagosPDFMun(res, mun) {
        const buffer = await this.pagosService.getAllPagosByPDF(mun);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Importe.pdf');
        res.setHeader('Content-Length', buffer.length);
        res.send(buffer);
    }
    async getAllPagosByMun(mun) {
        return await this.pagosService.getAllPagosByMun(mun);
    }
};
exports.PagosController = PagosController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Devuelve todos los cobros realizados" }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PagosController.prototype, "getAllPagos", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Devuelve todos los cobros realizados en formato pdf" }),
    (0, common_1.Get)('/pdf'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PagosController.prototype, "getAllPagosPDF", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Devuelve todos los cobros de un municipio en formato pdf" }),
    (0, common_1.Get)('/worker/pdf/:mun'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('mun')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PagosController.prototype, "getAllPagosPDFMun", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Devuelve todos los cobros de un municipio" }),
    (0, common_1.Get)('/:mun'),
    __param(0, (0, common_1.Param)('mun')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PagosController.prototype, "getAllPagosByMun", null);
exports.PagosController = PagosController = __decorate([
    (0, common_1.Controller)('api/pagos'),
    __metadata("design:paramtypes", [pagos_service_1.PagosService])
], PagosController);
//# sourceMappingURL=pagos.controller.js.map