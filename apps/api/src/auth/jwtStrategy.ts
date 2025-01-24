import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT_CONSTANTS } from "src/constants";


export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_CONSTANTS.secret,
            algorithm: ['RS256']
        })
    }

    async validate(payload: any){
        return {
            userId: payload.id,
            username: payload.name,
            roles: payload.roles
        };
    }
}