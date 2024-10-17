import { JwtService } from '@nestjs/jwt';
import { SignObjectDto } from './dto/signObject.dto';
import { LoginObjectDto } from './dto/loginObject.dto';
export declare class AuthService {
    private jwtService;
    private conn;
    constructor(jwtService: JwtService, conn: any);
    register(userObject: SignObjectDto): Promise<void>;
    login(userObject: LoginObjectDto): Promise<{
        user: any;
        token: string;
    }>;
    generateToken(user: any): Promise<{
        access_token: string;
    }>;
}
