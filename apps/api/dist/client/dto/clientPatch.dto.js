"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientPatchDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const client_dto_1 = require("./client.dto");
class ClientPatchDto extends (0, mapped_types_1.PartialType)(client_dto_1.ClientDto) {
}
exports.ClientPatchDto = ClientPatchDto;
//# sourceMappingURL=clientPatch.dto.js.map