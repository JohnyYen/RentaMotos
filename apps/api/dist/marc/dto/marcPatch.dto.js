"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.marcPatchDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const marc_dto_1 = require("./marc.dto");
class marcPatchDto extends (0, mapped_types_1.PartialType)(marc_dto_1.MarcDto) {
}
exports.marcPatchDto = marcPatchDto;
//# sourceMappingURL=marcPatch.dto.js.map