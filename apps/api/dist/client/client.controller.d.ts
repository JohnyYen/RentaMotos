import { ClientService } from './client.service';
import { ClientDto } from './dto/client.dto';
import { ClientPatchDto } from './dto/clientPatch.dto';
export declare class ClientController {
    private clientService;
    constructor(clientService: ClientService);
    getClients(): Promise<any>;
    getClientsByPDF(res: any): Promise<void>;
    getBadClients(): Promise<any>;
    getBadClientsByPDF(res: any): Promise<void>;
    createClient(clientDto: ClientDto): void;
    deleteClient(id: string): void;
    updateClient(id: string, client: ClientPatchDto): void;
}
