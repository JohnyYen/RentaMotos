import { JwtService } from '@nestjs/jwt';
import { LoginObjectDto } from './dto/loginObject.dto';
import { ClientSignDto } from './dto/clientSign.dto';
export declare class AuthService {
    private jwtService;
    private conn;
    constructor(jwtService: JwtService, conn: any);
    register(userObject: ClientSignDto): Promise<any>;
    login(userObject: LoginObjectDto): Promise<{
        userId: any;
        token: string;
    }>;
}
