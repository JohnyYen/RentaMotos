"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const common_1 = require("@nestjs/common");
class ErrorHandler {
    constructor(error) {
        this.error = error;
    }
    returnError() {
        const code = this.error.code;
        if (code === '23505')
            return new common_1.BadRequestException('Ya este Usuario existe, revise los datos por favor');
    }
}
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=errorHandler.js.map