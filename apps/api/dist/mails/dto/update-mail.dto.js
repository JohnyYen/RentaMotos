"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMailDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_mail_dto_1 = require("./create-mail.dto");
class UpdateMailDto extends (0, mapped_types_1.PartialType)(create_mail_dto_1.CreateMailDto) {
}
exports.UpdateMailDto = UpdateMailDto;
//# sourceMappingURL=update-mail.dto.js.map