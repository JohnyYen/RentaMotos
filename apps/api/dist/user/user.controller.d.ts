import { UserService } from './user.service';
import { UserClientDto } from './dto/userClient.dto';
import { UserWorkerDto } from './dto/userWorker.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUser(): Promise<any>;
    createUserClient(body: UserClientDto): void;
    getWorkers(): Promise<any>;
    createUserWorker(body: UserWorkerDto): void;
    deleteUser(userName: string): Promise<void>;
}
