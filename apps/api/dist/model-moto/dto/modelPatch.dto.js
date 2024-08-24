"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelPatchDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const model_dto_1 = require("./model.dto");
class ModelPatchDto extends (0, mapped_types_1.PartialType)(model_dto_1.ModelDto) {
}
exports.ModelPatchDto = ModelPatchDto;
//# sourceMappingURL=modelPatch.dto.js.map