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
exports.ModelController = void 0;
const common_1 = require("@nestjs/common");
const model_service_1 = require("./model.service");
const model_dto_1 = require("../motorcycle/dto/model.dto");
const swagger_1 = require("@nestjs/swagger");
let ModelController = class ModelController {
    constructor(modelService) {
        this.modelService = modelService;
    }
    getAllModels() {
        return this.modelService.getModels();
    }
    deleteModel(id) {
        this.modelService.deleteModels(id);
    }
    createModel(model) {
        this.modelService.createModels(model);
    }
    updateModel(id, body) {
        this.modelService.updateModel(body, id);
    }
};
exports.ModelController = ModelController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Devuelve todos los modelos de las motos" }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ModelController.prototype, "getAllModels", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'id', description: "Identificador del modelo" }),
    (0, swagger_1.ApiOperation)({ summary: "Elimina un modelo de moto dado su identificador" }),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ModelController.prototype, "deleteModel", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Crea un nuevo modelo" }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [model_dto_1.ModelDto]),
    __metadata("design:returntype", void 0)
], ModelController.prototype, "createModel", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: "id", description: "Identificador del modelo" }),
    (0, swagger_1.ApiOperation)({ summary: "Modifica un modelo dado su identificador" }),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, model_dto_1.ModelDto]),
    __metadata("design:returntype", void 0)
], ModelController.prototype, "updateModel", null);
exports.ModelController = ModelController = __decorate([
    (0, common_1.Controller)('api/model'),
    __metadata("design:paramtypes", [model_service_1.ModelService])
], ModelController);
//# sourceMappingURL=model.controller.js.map