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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const errorHandler_1 = require("../libs/errorHandler");
let UserService = class UserService {
    constructor(conn) {
        this.conn = conn;
    }
    async getUser() {
        const res = await this.conn.query('SELECT * FROM usuario');
        return res.rows;
    }
    async createUserClient(userClient) {
        try {
            await this.conn.query(`INSERT INTO usuario (nombre_usuario, contrasenia, email, tipo_usuario ,id_cliente) VALUES ('${userClient.user_name}', '${userClient.password}', '${userClient.email}', 2 ,'${userClient.id}')`);
        }
        catch (error) {
            console.log(error);
        }
    }
    async createUserWorker(userWorker) {
        try {
            await this.conn.query(`INSERT INTO usuario (nombre_usuario, contrasenia, tipo_usuario, mun) VALUES ('${userWorker.user_name}', '${userWorker.password}', 3, '${userWorker.mun}')`);
        }
        catch (error) {
            throw new errorHandler_1.ErrorHandler(error).returnError();
        }
    }
    async validateUserName(info) {
        const res = await this.conn.query(`SELECT * FROM usuario WHERE (nombre_usuario = '${info}' or email = '${info}')`);
        return !res.rows[0] !== null;
    }
    async deleteUser(userName) {
        await this.conn.query(`DELETE FROM usuario WHERE nombre_usuario = '${userName}'`);
    }
    async getWorkers() {
        const res = await this.conn.query('SELECT * FROM worker_view');
        return res.rows;
    }
    async validationUser(userName, contrasenia) {
        const res = await this.conn.query(`SELECT * FROM usuario_view WHERE (nombre_usuario = '${userName}' OR email = '${userName}') AND contrasenia = '${contrasenia}';`);
        return res.rows[0];
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.PG_CONNECTION)),
    __metadata("design:paramtypes", [Object])
], UserService);
//# sourceMappingURL=user.service.js.map