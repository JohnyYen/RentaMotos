"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MotorcyclePatchDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const motorcycle_dto_1 = require("./motorcycle.dto");
class MotorcyclePatchDto extends (0, mapped_types_1.PartialType)(motorcycle_dto_1.MotorcycleDto) {
}
exports.MotorcyclePatchDto = MotorcyclePatchDto;
//# sourceMappingURL=motorcyclePatch.dto.js.map