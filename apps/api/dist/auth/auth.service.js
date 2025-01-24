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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
const constants_1 = require("../constants");
let AuthService = class AuthService {
    constructor(jwtService, conn) {
        this.jwtService = jwtService;
        this.conn = conn;
    }
    async register(userObject) {
        const { password, email, user_name, ci } = userObject;
        const plainToCrypto = await (0, bcrypt_1.hash)(password, 10);
        userObject = { ...userObject, password: plainToCrypto };
        const response = await this.conn.query(`INSERT INTO usuario(nombre_usuario, contrasenia, email, tipo_usuario, id_cliente) VALUES ('${user_name}', '${password}', '${email}', 2, '${ci}')`);
        const createUser = await this.conn.query(`SELECT * FROM usuario WHERE nombre_usuario = '${user_name}'`);
        const user = createUser.rows[0];
        const payload = {
            name: user_name,
            roles: 2,
        };
        const token = this.jwtService.sign(payload);
        const data = {
            user: user,
            token,
        };
        console.log(data);
        return data;
    }
    async login(userObject) {
        const response = await this.conn.query(`SELECT * FROM usuario WHERE nombre_usuario = '${userObject.user_name}'`);
        const findUser = response.rows[0];
        if (!findUser)
            throw new common_1.HttpException("USER_NOT_FOUND", 402);
        const isCheked = (0, bcrypt_1.compare)(userObject.password, findUser.contrasenia);
        if (!isCheked)
            throw new common_1.HttpException("PASSWORD_INCORRECT", 401);
        const payload = {
            id: findUser.id_user,
            name: findUser.nombre_usuario,
            roles: findUser.tipo_usuario,
        };
        const token = this.jwtService.sign(payload);
        const data = {
            user: findUser,
            token,
        };
        return data;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(constants_1.PG_CONNECTION)),
    __metadata("design:paramtypes", [jwt_1.JwtService, Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map