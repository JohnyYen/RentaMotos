import { ClientDto } from './dto/client.dto';
import { PgService } from 'src/pg/pg.service';
export declare class ClientService {
    private conn;
    private pgService;
    constructor(conn: any, pgService: PgService);
    getAllClients(pageSize?: number, page?: number): Promise<any>;
    getClientByMun(mun: string): Promise<any>;
    getClient(id: string): Promise<any>;
    getAllClientByPDF(): Promise<Buffer>;
    getAllClientPDFWorkerMun(mun: string): Promise<Buffer>;
    validatePhoneNumber(num: string): Promise<boolean>;
    deleteClient(id: number): Promise<void>;
    createClient(client: ClientDto): Promise<any>;
    updateClient(client: ClientDto, id: string): Promise<any>;
    getAllBadClients(): Promise<any>;
    getPDFBadClients(): Promise<Buffer>;
    getAllMun(): Promise<any>;
}
