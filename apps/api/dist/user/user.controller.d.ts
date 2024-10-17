import { UserService } from './user.service';
import { UserClientDto } from './dto/userClient.dto';
import { UserWorkerDto } from './dto/userWorker.dto';
import { AuthService } from 'src/auth/auth.service';
export declare class UserController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    getUser(): Promise<any>;
    createUserClient(body: UserClientDto): void;
    validateCreateUser(body: any): Promise<{
        access_token: string;
    }>;
    getWorkers(): Promise<any>;
    createUserWorker(body: UserWorkerDto): void;
    validateUser(userName: string, password: string): Promise<{
        access_token: string;
    }>;
    deleteUser(userName: string): Promise<void>;
}
