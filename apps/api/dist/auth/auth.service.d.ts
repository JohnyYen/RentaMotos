import { JwtService } from '@nestjs/jwt';
import { LoginObjectDto } from './dto/loginObject.dto';
import { ClientSignDto } from './dto/clientSign.dto';
export declare class AuthService {
    private jwtService;
    private conn;
    constructor(jwtService: JwtService, conn: any);
    register(userObject: ClientSignDto): Promise<{
        user: any;
        token: string;
    }>;
    login(userObject: LoginObjectDto): Promise<{
        user: any;
        token: string;
    }>;
}
