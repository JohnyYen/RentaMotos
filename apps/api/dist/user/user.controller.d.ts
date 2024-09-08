import { UserService } from './user.service';
import { UserClientDto } from './dto/userClient.dto';
import { UserWorkerDto } from './dto/userWorker.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUser(): Promise<any>;
    createUserClient(body: UserClientDto): void;
    createUserWorker(body: UserWorkerDto): void;
    validateUser(userName: string, email: string, password: string): Promise<any>;
    deleteUser(userName: string): Promise<void>;
}
