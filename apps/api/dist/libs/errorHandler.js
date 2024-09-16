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
        console.log(code);
        console.log(this.error.message);
        let message = this.error.message;
        if (code === '23505')
            message = 'Ya este Usuario existe, revise los datos por favor';
        return new common_1.BadRequestException(message);
    }
}
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=errorHandler.js.map