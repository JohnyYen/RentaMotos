"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MotorcyclePartial = void 0;
const swagger_1 = require("@nestjs/swagger");
const motorcycle_dto_1 = require("./motorcycle.dto");
class MotorcyclePartial extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(motorcycle_dto_1.MotorcycleDto, ['matricula'])) {
}
exports.MotorcyclePartial = MotorcyclePartial;
//# sourceMappingURL=motorcyclePartial.dto.js.map