"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientPartialDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_dto_1 = require("./client.dto");
class ClientPartialDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(client_dto_1.ClientDto, ['edad', 'idCliente'])) {
}
exports.ClientPartialDto = ClientPartialDto;
//# sourceMappingURL=clientPartial.dto.js.map