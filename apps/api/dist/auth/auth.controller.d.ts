import { AuthService } from './auth.service';
import { LoginObjectDto } from './dto/loginObject.dto';
import { SignObjectDto } from './dto/signObject.dto';
export declare class AuthController {
    private jwtService;
    constructor(jwtService: AuthService);
    login(authObject: LoginObjectDto): void;
    register(authObject: SignObjectDto): void;
}
