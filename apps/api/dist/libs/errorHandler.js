"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const common_1 = require("@nestjs/common");
class ErrorHandler {
    constructor(error) {
        this.error = error;
    }
    returnError() {
        const errorCode = this.error.code;
        const errorMessage = this.error.message;
        let message = this.error.message;
        let code = this.error.code;
        if (errorCode === '23505') {
            if (errorMessage.includes('moto_pkey'))
                message = 'THIS_MOTO_EXIST';
            if (errorMessage.includes('modelo_pkey'))
                message = 'THIS_MODEL_EXIST';
            if (errorMessage.includes('marca_pkey'))
                message = 'THIS_MARC_EXIST';
            if (errorMessage.includes('cliente_pkey'))
                message = 'THIS_CLIENTE_EXIST';
            code = 401;
        }
        if (errorCode === '23503') {
            if (errorMessage.includes('moto_modelo_fkey'))
                message = 'FOR_THIS_MODEL_EXIST_MOTO';
            if (errorMessage.includes('contrato_moto_fkey'))
                message = 'FOR_THIS_MOTO_EXIST_CONTRACT';
            if (errorMessage.includes('contrato_cliente_fkey'))
                message = 'FOR_THIS_CLIENT_EXIST_CONTRACT';
            code = 401;
        }
        throw new common_1.HttpException(message, code);
    }
}
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=errorHandler.js.map