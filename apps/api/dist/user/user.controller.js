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
    createUserWorker(body) {
        this.userService.createUserWorker(body);
    }
    async validateUser(userName, email, password) {
        return await this.userService.validationUser(userName, email, password);
    }
    async deleteUser(userName) {
        this.userService.deleteUser(userName);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)('/client'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userClient_dto_1.UserClientDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createUserClient", null);
__decorate([
    (0, common_1.Post)('/worker'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userWorker_dto_1.UserWorkerDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createUserWorker", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('userName')),
    __param(1, (0, common_1.Body)('email')),
    __param(2, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "validateUser", null);
__decorate([
    (0, common_1.Delete)('/:userName'),
    __param(0, (0, common_1.Param)('userName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('api/user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map