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
exports.MotorcycleController = void 0;
const common_1 = require("@nestjs/common");
const motorcycle_service_1 = require("./motorcycle.service");
const motorcycle_dto_1 = require("./dto/motorcycle.dto");
const motorcyclePatch_dto_1 = require("./dto/motorcyclePatch.dto");
let MotorcycleController = class MotorcycleController {
    constructor(motoService) {
        this.motoService = motoService;
    }
    getAllMoto() {
        return this.motoService.getAllMotorcycle();
    }
    getAllMotoInPDF() {
    }
    createMoto(body) {
        this.motoService.createMotorcycle(body);
    }
    deleteMoto(id) {
        this.motoService.deleteMotorcycle(id);
    }
    updateMoto(id, update) {
        this.motoService.updateMotorcycle(update, id);
    }
};
exports.MotorcycleController = MotorcycleController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MotorcycleController.prototype, "getAllMoto", null);
__decorate([
    (0, common_1.Get)('/pdf'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MotorcycleController.prototype, "getAllMotoInPDF", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [motorcycle_dto_1.MotorcycleDto]),
    __metadata("design:returntype", void 0)
], MotorcycleController.prototype, "createMoto", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MotorcycleController.prototype, "deleteMoto", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, motorcyclePatch_dto_1.MotorcyclePatchDto]),
    __metadata("design:returntype", void 0)
], MotorcycleController.prototype, "updateMoto", null);
exports.MotorcycleController = MotorcycleController = __decorate([
    (0, common_1.Controller)('api/moto'),
    __metadata("design:paramtypes", [motorcycle_service_1.MotorcycleService])
], MotorcycleController);
//# sourceMappingURL=motorcycle.controller.js.map