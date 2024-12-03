"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkipAuth = void 0;
const common_1 = require("@nestjs/common");
const SkipAuth = () => (0, common_1.SetMetadata)('isPublic', true);
exports.SkipAuth = SkipAuth;
//# sourceMappingURL=public.decorator.js.map