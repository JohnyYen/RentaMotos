"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginObjectDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const userObject_dto_1 = require("./userObject.dto");
class LoginObjectDto extends (0, swagger_1.PartialType)(userObject_dto_1.User) {
}
exports.LoginObjectDto = LoginObjectDto;
//# sourceMappingURL=loginObject.dto.js.map