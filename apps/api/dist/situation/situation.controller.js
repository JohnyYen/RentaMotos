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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SituationController = void 0;
const common_1 = require("@nestjs/common");
const situation_service_1 = require("./situation.service");
const swagger_1 = require("@nestjs/swagger");
let SituationController = class SituationController {
    constructor(service) {
        this.service = service;
    }
    ;
    async getSituation() {
        return await this.service.getSituation();
    }
};
exports.SituationController = SituationController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Devuelve todas las situaciones de las motos" }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SituationController.prototype, "getSituation", null);
exports.SituationController = SituationController = __decorate([
    (0, common_1.Controller)('api/situation'),
    __metadata("design:paramtypes", [situation_service_1.SituationService])
], SituationController);
//# sourceMappingURL=situation.controller.js.map