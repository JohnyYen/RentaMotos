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
exports.User = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class User {
}
exports.User = User;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "Contraseña del usuario", example: "asdASD123" }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "Nombre de usuario", example: "johnyYen" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "user_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "Correo Electrónico del Usuario", example: "jhonnyantonio892@gmail.com" }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
//# sourceMappingURL=userObject.dto.js.map