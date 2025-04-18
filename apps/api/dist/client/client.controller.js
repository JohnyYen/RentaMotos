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
exports.ClientController = void 0;
const common_1 = require("@nestjs/common");
const client_service_1 = require("./client.service");
const client_dto_1 = require("./dto/client.dto");
const swagger_1 = require("@nestjs/swagger");
const jwtAuthGuard_1 = require("../auth/jwtAuthGuard");
const public_decorator_1 = require("../auth/public.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const role_enum_1 = require("../auth/role.enum");
const roles_decorator_1 = require("../auth/roles.decorator");
let ClientController = class ClientController {
    constructor(clientService) {
        this.clientService = clientService;
    }
    async getClients() {
        return await this.clientService.getAllClients();
    }
    async getClientsByPDF(res) {
        const buffer = await this.clientService.getAllClientByPDF();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Clients.pdf');
        res.setHeader('Content-Length', buffer.length);
        res.send(buffer);
    }
    async getAllMun() {
        return await this.clientService.getAllMun();
    }
    async getClientesByMun(mun) {
        return await this.clientService.getClientByMun(mun);
    }
    async getBadClients() {
        return await this.clientService.getAllBadClients();
    }
    async getBadClientsByPDF(res) {
        const buffer = await this.clientService.getPDFBadClients();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=BadClients.pdf');
        res.setHeader('Content-Length', buffer.length);
        res.send(buffer);
    }
    async getClient(id) {
        return await this.clientService.getClient(id);
    }
    async getPDF(mun, res) {
        const buffer = await this.clientService.getAllClientPDFWorkerMun(mun);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=ClientsWorker.pdf');
        res.setHeader('Content-Length', buffer.length);
        res.send(buffer);
    }
    async createClient(clientDto) {
        return await this.clientService.createClient(clientDto);
    }
    async validateNumber(body) {
        return this.clientService.validatePhoneNumber(body.phoneNumber);
    }
    async updateClient(id, client) {
        return await this.clientService.updateClient(client, id);
    }
    async deleteClient(id) {
        return await this.clientService.deleteClient(+id);
    }
};
exports.ClientController = ClientController;
__decorate([
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Worker, role_enum_1.Role.User),
    (0, swagger_1.ApiOperation)({ summary: "Devuelve todos los clientes" }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getClients", null);
__decorate([
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Worker),
    (0, swagger_1.ApiOperation)({ summary: "Devuelve todos los clientes en formato pdf" }),
    (0, common_1.Get)('/pdf'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getClientsByPDF", null);
__decorate([
    (0, public_decorator_1.SkipAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Devuelve todos los municipios" }),
    (0, common_1.Get)('/mun'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getAllMun", null);
__decorate([
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Worker),
    (0, swagger_1.ApiOperation)({ summary: "Devuelve todos los clientes según su municipio" }),
    (0, common_1.Get)('/mun/:mun'),
    __param(0, (0, common_1.Param)('mun')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getClientesByMun", null);
__decorate([
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Worker),
    (0, swagger_1.ApiOperation)({ summary: "Devuelve todos los clientes incumplidores" }),
    (0, common_1.Get)("/bad"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getBadClients", null);
__decorate([
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Worker),
    (0, swagger_1.ApiOperation)({ summary: "Devuelve el listado de los clientes incumplidores en formato pdf" }),
    (0, common_1.Get)('/bad/pdf'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getBadClientsByPDF", null);
__decorate([
    (0, public_decorator_1.SkipAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Devuelve a un cliente según su identificador" }),
    (0, common_1.Get)('/sample/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getClient", null);
__decorate([
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Worker),
    (0, swagger_1.ApiOperation)({ summary: "Devuelve a todos los clientes que pertenecen a un municipio en formato pdf" }),
    (0, common_1.Get)('/worker/pdf/:mun'),
    __param(0, (0, common_1.Param)('mun')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getPDF", null);
__decorate([
    (0, public_decorator_1.SkipAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Crea un nuevo cliente" }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_dto_1.ClientDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "createClient", null);
__decorate([
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Worker),
    (0, swagger_1.ApiOperation)({ summary: "Valida que el telefono no se repita" }),
    (0, common_1.Post)('/validate/phone'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "validateNumber", null);
__decorate([
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Worker),
    (0, swagger_1.ApiBody)({ type: client_dto_1.ClientDto, description: "Es el dto de Cliente" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "El carnet de identidad del cliente" }),
    (0, swagger_1.ApiOperation)({ summary: "Modifica un cliente según su identificador" }),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, client_dto_1.ClientDto]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "updateClient", null);
__decorate([
    (0, common_1.UseGuards)(jwtAuthGuard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.Worker),
    (0, swagger_1.ApiOperation)({ summary: "Elimina un cliente según su identificador" }),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "deleteClient", null);
exports.ClientController = ClientController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Clientes'),
    (0, common_1.Controller)('api/client'),
    __metadata("design:paramtypes", [client_service_1.ClientService])
], ClientController);
//# sourceMappingURL=client.controller.js.map