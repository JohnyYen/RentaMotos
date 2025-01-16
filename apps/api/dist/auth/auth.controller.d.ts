import { AuthService } from './auth.service';
import { LoginObjectDto } from './dto/loginObject.dto';
import { ClientSignDto } from './dto/clientSign.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(authObject: LoginObjectDto): Promise<{
        userId: any;
        token: string;
    }>;
    register(authObject: ClientSignDto): void;
}
