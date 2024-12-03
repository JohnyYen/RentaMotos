"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractPartialDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const contract_dto_1 = require("./contract.dto");
class ContractPartialDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(contract_dto_1.ContractDto, ['beginDate', 'firmaDate', 'idCliente', 'matricula'])) {
}
exports.ContractPartialDto = ContractPartialDto;
//# sourceMappingURL=contractPartial.dto.js.map