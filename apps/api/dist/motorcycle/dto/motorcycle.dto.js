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
exports.MotorcycleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class MotorcycleDto {
}
exports.MotorcycleDto = MotorcycleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "La matricula de la moto", example: 'LH031210' }),
    (0, class_validator_1.IsString)({ message: "The matricula atribute can be a String" }),
    __metadata("design:type", String)
], MotorcycleDto.prototype, "matricula", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "El color de la moto", example: 'Rojo' }),
    (0, class_validator_1.IsString)({ message: "The color atribute can be a String" }),
    __metadata("design:type", String)
], MotorcycleDto.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: "La cantidad de Km recorridos por la moto", example: 14, minimum: 0 }),
    (0, class_validator_1.IsInt)({ message: "The cantKm atribute can be a Integer" }),
    (0, class_validator_1.Min)(0, { message: "The cantKm can be zero" }),
    __metadata("design:type", Number)
], MotorcycleDto.prototype, "cantKm", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "La marca de la moto", example: 'Honda' }),
    (0, class_validator_1.IsString)({ message: "The marca atribute can be a String" }),
    __metadata("design:type", String)
], MotorcycleDto.prototype, "marca", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "El modelo de la moto", example: 'Odissey' }),
    (0, class_validator_1.IsString)({ message: "The modelo atribute can be a String" }),
    __metadata("design:type", String)
], MotorcycleDto.prototype, "modelo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: "La situacion de la moto", examples: ['Alquilada', 'Taller', 'Disponible'] }),
    (0, class_validator_1.IsString)({ message: "The situacion atribute can be a String" }),
    __metadata("design:type", String)
], MotorcycleDto.prototype, "situacion", void 0);
//# sourceMappingURL=motorcycle.dto.js.map