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
    (0, swagger_1.ApiProperty)({ name: "idCliente", description: "Identificador del Cliente", example: '03121067683', type: String }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContractDto.prototype, "idCliente", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: "matricula", description: "Matricula de la Moto", example: 'LH031210', type: String }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContractDto.prototype, "matricula", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: "beginDate", description: "Fecha de Inicio del Contrato", example: '24/12/2024', type: String }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContractDto.prototype, "beginDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: "endDate", description: "Fecha de Fin del Contrato", example: '24/01/2025', type: String }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContractDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: "firmaDate", description: "Fecha de Firma del Contrato", example: '23/12/2024', type: String }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContractDto.prototype, "firmaDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: "formaPago", description: "Forma de Pago el Contrato", example: 'Cheque', type: String }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContractDto.prototype, "formaPago", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: "seguro", description: "Si el contrato tiene seguro o no", example: false, type: Boolean }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ContractDto.prototype, "seguro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: "diasProrroga", description: "Los dias de prorroga que tenga el contrato", example: 10, type: Number }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ContractDto.prototype, "diasProrroga", void 0);
//# sourceMappingURL=contract.dto.js.map