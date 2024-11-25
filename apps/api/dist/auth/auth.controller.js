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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const loginObject_dto_1 = require("./dto/loginObject.dto");
const signObject_dto_1 = require("./dto/signObject.dto");
const clientSign_dto_1 = require("./dto/clientSign.dto");
const public_decorator_1 = require("./public.decorator");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(authObject) {
        return this.authService.login(authObject);
    }
    register(authObject) {
        this.authService.register(authObject);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_1.SkipAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Loguear al usuario" }),
    (0, swagger_1.ApiBody)({ type: loginObject_dto_1.LoginObjectDto, description: 'Revisar la documentación del Login Dto' }),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loginObject_dto_1.LoginObjectDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, public_decorator_1.SkipAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Registrar un nuevo usuario" }),
    (0, swagger_1.ApiBody)({ type: signObject_dto_1.SignObjectDto, description: "Revisar la documentación del Sign Dto" }),
    (0, common_1.Post)("/register"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [clientSign_dto_1.ClientSignDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('api/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map