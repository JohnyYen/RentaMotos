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
exports.FormaPagoController = void 0;
const common_1 = require("@nestjs/common");
const forma_pago_service_1 = require("./forma-pago.service");
const formaPago_dto_1 = require("./dto/formaPago.dto");
let FormaPagoController = class FormaPagoController {
    constructor(formaPagoService) {
        this.formaPagoService = formaPagoService;
    }
    async getAllFormaPago() {
        return await this.formaPagoService.getAllFormaPago();
    }
    createFormaPago(form) {
        this.formaPagoService.createFormaPago(form);
    }
    deleteFormaPago(form) {
        this.formaPagoService.deleteFormaPago(form);
    }
    updateFormaPago(body, id) {
        this.formaPagoService.updateFormaPago(body, id);
    }
};
exports.FormaPagoController = FormaPagoController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FormaPagoController.prototype, "getAllFormaPago", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [formaPago_dto_1.FormaPagoDto]),
    __metadata("design:returntype", void 0)
], FormaPagoController.prototype, "createFormaPago", null);
__decorate([
    (0, common_1.Delete)("/form"),
    __param(0, (0, common_1.Param)('form')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FormaPagoController.prototype, "deleteFormaPago", null);
__decorate([
    (0, common_1.Patch)('/id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [formaPago_dto_1.FormaPagoDto, String]),
    __metadata("design:returntype", void 0)
], FormaPagoController.prototype, "updateFormaPago", null);
exports.FormaPagoController = FormaPagoController = __decorate([
    (0, common_1.Controller)('forma-pago'),
    __metadata("design:paramtypes", [forma_pago_service_1.FormaPagoService])
], FormaPagoController);
//# sourceMappingURL=forma-pago.controller.js.map