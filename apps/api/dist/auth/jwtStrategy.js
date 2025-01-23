"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const constants_1 = require("../constants");
class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: constants_1.JWT_CONSTANTS.secret,
            algorithm: ['RS256']
        });
    }
    async validate(payload) {
        return {
            userId: payload.id,
            username: payload.name,
            roles: payload.roles
        };
    }
}
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwtStrategy.js.map