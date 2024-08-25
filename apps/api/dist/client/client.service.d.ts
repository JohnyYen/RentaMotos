import { ClientDto } from './dto/client.dto';
import { ClientPatchDto } from './dto/clientPatch.dto';
export declare class ClientService {
    private conn;
    constructor(conn: any);
    getAllClients(): Promise<any>;
    getAllClientByPDF(): Promise<Buffer>;
    deleteClient(id: string): Promise<void>;
    createClient(client: ClientDto): Promise<void>;
    updateClient(client: ClientPatchDto, id: string): Promise<void>;
    getAllBadClients(): Promise<any>;
    getPDFBadClients(): Promise<Buffer>;
}
