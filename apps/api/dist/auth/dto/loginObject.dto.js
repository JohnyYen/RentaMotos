"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginObjectDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const signObject_dto_1 = require("./signObject.dto");
class LoginObjectDto extends (0, swagger_1.PartialType)(signObject_dto_1.SignObjectDto) {
}
exports.LoginObjectDto = LoginObjectDto;
//# sourceMappingURL=loginObject.dto.js.map