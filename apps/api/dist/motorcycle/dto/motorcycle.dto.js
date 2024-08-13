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
const class_validator_1 = require("class-validator");
class MotorcycleDto {
}
exports.MotorcycleDto = MotorcycleDto;
__decorate([
    (0, class_validator_1.IsString)({ message: "The matricula atributes can be a String" }),
    __metadata("design:type", String)
], MotorcycleDto.prototype, "matricula", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "The color atributes can be a String" }),
    __metadata("design:type", String)
], MotorcycleDto.prototype, "color", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: "The cantKm atributes can be a Integer" }),
    (0, class_validator_1.Max)(0, { message: "The cantKm can be zero" }),
    (0, class_validator_1.Min)(0, { message: "The cantKm can be zero" }),
    __metadata("design:type", Number)
], MotorcycleDto.prototype, "cantKm", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "The marca atributes can be a String" }),
    __metadata("design:type", String)
], MotorcycleDto.prototype, "marca", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "The modelo atributes can be a String" }),
    __metadata("design:type", String)
], MotorcycleDto.prototype, "modelo", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "The situacion atributes can be a String" }),
    __metadata("design:type", String)
], MotorcycleDto.prototype, "situacion", void 0);
//# sourceMappingURL=motorcycle.dto.js.map