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
exports.ClientDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ClientDto {
}
exports.ClientDto = ClientDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "Identificador del cliente", example: '03121067683' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClientDto.prototype, "idCliente", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "Primer Nombre del cliente", example: 'Johny' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClientDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "Segundo Nombre del cliente", example: 'Antonio' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClientDto.prototype, "segNombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "Primer Apellido del cliente", example: 'Pedraza' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClientDto.prototype, "primApellido", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "Segundo Apellido del cliente", example: 'Romero' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClientDto.prototype, "segApellido", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: "Edad del cliente", example: 21 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ClientDto.prototype, "edad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "Municipio del cliente", example: 'Centro Habana' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClientDto.prototype, "municipio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "Sexo del cliente", example: 'M' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClientDto.prototype, "sexo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "Número de Contacto del cliente", example: '55002026' }),
    __metadata("design:type", String)
], ClientDto.prototype, "numCont", void 0);
//# sourceMappingURL=client.dto.js.map