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
exports.WorkerSignDto = void 0;
const class_validator_1 = require("class-validator");
const userObject_dto_1 = require("./userObject.dto");
const swagger_1 = require("@nestjs/swagger");
class WorkerSignDto extends userObject_dto_1.User {
}
exports.WorkerSignDto = WorkerSignDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'El municipio el cual es encargado el trabajador' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WorkerSignDto.prototype, "mun", void 0);
//# sourceMappingURL=workerSign.dto.js.map