import { ClientDto } from './dto/client.dto';
export declare class ClientService {
    private conn;
    constructor(conn: any);
    getAllClients(): Promise<any>;
    getClientByMun(mun: string): Promise<any>;
    getClient(id: string): Promise<any>;
    getAllClientByPDF(): Promise<Buffer>;
    deleteClient(id: string): Promise<void>;
    createClient(client: ClientDto): Promise<void>;
    updateClient(client: ClientDto, id: string): Promise<void>;
    getAllBadClients(): Promise<any>;
    getPDFBadClients(): Promise<Buffer>;
}
