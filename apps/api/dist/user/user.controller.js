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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const userClient_dto_1 = require("./dto/userClient.dto");
const userWorker_dto_1 = require("./dto/userWorker.dto");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUser() {
        return await this.userService.getUser();
    }
    createUserClient(body) {
        this.userService.createUserClient(body);
    }
    async getWorkers() {
        return this.userService.getWorkers();
    }
    createUserWorker(body) {
        this.userService.createUserWorker(body);
    }
    async deleteUser(userName) {
        this.userService.deleteUser(userName);
    }
};
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Devuelve todos los usuarios" }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: userClient_dto_1.UserClientDto, description: "Los datos de un usuario tipo cliente" }),
    (0, swagger_1.ApiOperation)({ summary: "Crea un nuevo usuario cliente" }),
    (0, common_1.Post)('/client'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userClient_dto_1.UserClientDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createUserClient", null);
__decorate([
    (0, common_1.Get)('/worker'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getWorkers", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: userWorker_dto_1.UserWorkerDto, description: "Los datos de un usuario tipo trabajador" }),
    (0, swagger_1.ApiOperation)({ summary: "Crea un nuevo trabajador" }),
    (0, common_1.Post)('/worker'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userWorker_dto_1.UserWorkerDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createUserWorker", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: "userName", description: "Nombre de Usuario" }),
    (0, swagger_1.ApiOperation)({ summary: "Elimina Usuarios" }),
    (0, common_1.Delete)('/:userName'),
    __param(0, (0, common_1.Param)("userName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('api/user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map