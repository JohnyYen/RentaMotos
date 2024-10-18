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
exports.ContractDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ContractDto {
}
exports.ContractDto = ContractDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "Identificador del cliente", example: '03121067683' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContractDto.prototype, "idCliente", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "Matricula de la moto", example: 'LH031210' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContractDto.prototype, "matricula", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "Fecha de puesto en vigor el contrato", example: '24/12/2024' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContractDto.prototype, "beginDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "Fecha de Finalización del contrato", example: '24/01/2025' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContractDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "Fecha de Firma del Contrato", example: '23/12/2024' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContractDto.prototype, "firmaDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "Forma de pago del Contrato", example: 'Cheque' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContractDto.prototype, "formaPago", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, description: "Si el Contrato tiene seguro", example: false }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ContractDto.prototype, "seguro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: "Dias de prorroga del contrato", example: 0, minimum: 0 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ContractDto.prototype, "diasProrroga", void 0);
//# sourceMappingURL=contract.dto.js.map