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
exports.MarcController = void 0;
const common_1 = require("@nestjs/common");
const marc_service_1 = require("./marc.service");
const marc_dto_1 = require("./dto/marc.dto");
let MarcController = class MarcController {
    constructor(marcService) {
        this.marcService = marcService;
    }
    getAllMarc() {
        return this.marcService.getMarc();
    }
    deleteMarc(marc) {
        this.marcService.deleteMarc(marc);
    }
    createMarc(marc) {
        this.marcService.createMarc(marc);
    }
};
exports.MarcController = MarcController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MarcController.prototype, "getAllMarc", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)('marc')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarcController.prototype, "deleteMarc", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('marc')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [marc_dto_1.MarcDto]),
    __metadata("design:returntype", void 0)
], MarcController.prototype, "createMarc", null);
exports.MarcController = MarcController = __decorate([
    (0, common_1.Controller)('api/marc'),
    __metadata("design:paramtypes", [marc_service_1.MarcService])
], MarcController);
//# sourceMappingURL=marc.controller.js.map