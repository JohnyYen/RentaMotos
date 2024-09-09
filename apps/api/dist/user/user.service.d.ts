import { UserClientDto } from './dto/userClient.dto';
import { UserWorkerDto } from './dto/userWorker.dto';
export declare class UserService {
    private conn;
    constructor(conn: any);
    getUser(): Promise<any>;
    createUserClient(userClient: UserClientDto): Promise<void>;
    createUserWorker(userWorker: UserWorkerDto): Promise<void>;
    deleteUser(userName: string): Promise<void>;
    validationUser(userName: string, contrasenia: string): Promise<any>;
}
