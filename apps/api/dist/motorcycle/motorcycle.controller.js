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
const swagger_1 = require("@nestjs/swagger");
const marc_dto_1 = require("./dto/marc.dto");
const model_dto_1 = require("./dto/model.dto");
const jwtAuthGuard_1 = require("../auth/jwtAuthGuard");
const role_enum_1 = require("../auth/role.enum");
const roles_decorator_1 = require("../auth/roles.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const motorcyclePartial_dto_1 = require("./dto/motorcyclePartial.dto");
const public_decorator_1 = require("../auth/public.decorator");
let MotorcycleController = class MotorcycleController {
    constructor(motoService) {
        this.motoService = motoService;
    }
    getAllMoto() {
        return this.motoService.getAllMotorcycle();
    }
    async getAllMotoInPDF(res) {
        const buffer = await this.motoService.getPDF();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=ReporteMoto.pdf');
        res.setHeader('Content-Length', buffer.length);
        res.send(buffer);
    }
    async getMotoClient() {
        return await this.motoService.getMotoClient();
    }
    getSituationMoto() {
        return this.motoService.getSituationMoto();
    }
    async getPDFSituation(res) {
        const buffer = await this.motoService.getPDFSituation();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=SituacionMoto.pdf');
        res.setHeader('Content-Length', buffer.length);
        res.send(buffer);
    }
    async getAllModels() {
        return await this.motoService.getModels();
    }
    async getSituation() {
        return await this.motoService.getSituation();
    }
    async getMarc() {
        return await this.motoService.getMarc();
    }
    async createMoto(body) {
        return await this.motoService.createMotorcycle(body);
    }
    async createMarc(marc) {
        return await this.motoService.createMarc(marc);
    }
    async createModel(model) {
        return await this.motoService.createModels(model);
    }
    async updateMoto(id, update) {
        return await this.motoService.updateMotorcycle(update, id);
    }
    async updateModel(id, body) {
        return await this.motoService.updateModel(body, +id);
    }
    async updateMarc(id, body) {
        return await this.motoService.updateMarc(body, +id);
    }
    async deleteMoto(id) {
        return await this.motoService.deleteMotorcycle(id);
    }
    async deleteModel(id) {
        return await this.motoService.deleteModels(+id);
    }
    async deleteMarc(id) {
        return await this.motoService.deleteMarc(+id);
    }
};
exports.MotorcycleController = MotorcycleController;
__decorate([
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, swagger_1.ApiOperation)({ summary: "Devuelve todas las motos" }),
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User, role_enum_1.Role.Worker),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MotorcycleController.prototype, "getAllMoto", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Worker),
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, swagger_1.ApiOperation)({ summary: "Devuelve todas las motos en formato pdf" }),
    (0, common_1.Get)('/pdf'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MotorcycleController.prototype, "getAllMotoInPDF", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Worker),
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, swagger_1.ApiOperation)({ summary: "Devuelve todas las motos que esten disponible" }),
    (0, common_1.Get)('/client'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MotorcycleController.prototype, "getMotoClient", null);
__decorate([
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard),
    (0, public_decorator_1.SkipAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Devuelve la situación de las motos" }),
    (0, common_1.Get)('/situation'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MotorcycleController.prototype, "getSituationMoto", null);
__decorate([
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Worker),
    (0, swagger_1.ApiOperation)({ summary: "Devuelve la situación de las motos en formato pdf" }),
    (0, common_1.Get)('/situation/pdf'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MotorcycleController.prototype, "getPDFSituation", null);
__decorate([
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard),
    (0, public_decorator_1.SkipAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Devuelve todos los modelos de las motos" }),
    (0, common_1.Get)('/model'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MotorcycleController.prototype, "getAllModels", null);
__decorate([
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard),
    (0, public_decorator_1.SkipAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Devuelve todas las situaciones posibles para las motos" }),
    (0, common_1.Get)('/situacion'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MotorcycleController.prototype, "getSituation", null);
__decorate([
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard),
    (0, public_decorator_1.SkipAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Devuelve todas las marcas de las motos" }),
    (0, common_1.Get)('/marc'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MotorcycleController.prototype, "getMarc", null);
__decorate([
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Worker),
    (0, swagger_1.ApiBody)({ type: motorcycle_dto_1.MotorcycleDto, description: "Los datos de la moto" }),
    (0, swagger_1.ApiOperation)({ summary: "Crea una moto" }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [motorcycle_dto_1.MotorcycleDto]),
    __metadata("design:returntype", Promise)
], MotorcycleController.prototype, "createMoto", null);
__decorate([
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiBody)({ type: marc_dto_1.MarcDto, description: "Los datos de la marca" }),
    (0, swagger_1.ApiOperation)({ summary: "Crea una nueva marca de moto" }),
    (0, common_1.Post)('/marca'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [marc_dto_1.MarcDto]),
    __metadata("design:returntype", Promise)
], MotorcycleController.prototype, "createMarc", null);
__decorate([
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiBody)({ type: model_dto_1.ModelDto, description: "Los datos para crear una nueva moto" }),
    (0, swagger_1.ApiOperation)({ summary: "Crea un nuevo modelo" }),
    (0, common_1.Post)('/model'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [model_dto_1.ModelDto]),
    __metadata("design:returntype", Promise)
], MotorcycleController.prototype, "createModel", null);
__decorate([
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Worker),
    (0, swagger_1.ApiParam)({ name: "id", description: "La matricula de la moto" }),
    (0, swagger_1.ApiBody)({ type: motorcycle_dto_1.MotorcycleDto, description: "Los datos de las motos" }),
    (0, swagger_1.ApiOperation)({ summary: "Modifica una moto según su id" }),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, motorcyclePartial_dto_1.MotorcyclePartial]),
    __metadata("design:returntype", Promise)
], MotorcycleController.prototype, "updateMoto", null);
__decorate([
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiBody)({ type: model_dto_1.ModelDto, description: "Los datos del modelo" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Identificador del modelo" }),
    (0, swagger_1.ApiOperation)({ summary: "Modifica un modelo dado su identificador" }),
    (0, common_1.Patch)('/model/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, model_dto_1.ModelDto]),
    __metadata("design:returntype", Promise)
], MotorcycleController.prototype, "updateModel", null);
__decorate([
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiBody)({ type: marc_dto_1.MarcDto, description: "Los datos de la Marca" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Es el identificador de la marca", example: 1 }),
    (0, swagger_1.ApiOperation)({ summary: "Modifica una marca de moto" }),
    (0, common_1.Patch)('/marc/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, marc_dto_1.MarcDto]),
    __metadata("design:returntype", Promise)
], MotorcycleController.prototype, "updateMarc", null);
__decorate([
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Worker),
    (0, swagger_1.ApiParam)({ name: "id", description: "Matricula de la Moto" }),
    (0, swagger_1.ApiOperation)({ summary: "Elimina una moto según su id" }),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MotorcycleController.prototype, "deleteMoto", null);
__decorate([
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiParam)({ name: 'id', description: "Identificador del modelo" }),
    (0, swagger_1.ApiOperation)({ summary: "Elimina un modelo de moto dado su identificador" }),
    (0, common_1.Delete)('/model/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MotorcycleController.prototype, "deleteModel", null);
__decorate([
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiParam)({ name: 'id', description: "Identificador de la marca", example: 1 }),
    (0, swagger_1.ApiOperation)({ summary: "Elimina una marca según su ID" }),
    (0, common_1.Delete)('/marc/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MotorcycleController.prototype, "deleteMarc", null);
exports.MotorcycleController = MotorcycleController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Motocicletas'),
    (0, common_1.Controller)('api/moto'),
    __metadata("design:paramtypes", [motorcycle_service_1.MotorcycleService])
], MotorcycleController);
//# sourceMappingURL=motorcycle.controller.js.map