import { ClientService } from './client.service';
import { ClientDto } from './dto/client.dto';
import { ClientPatchDto } from './dto/clientPatch.dto';
export declare class ClientController {
    private clientService;
    constructor(clientService: ClientService);
    getClients(): Promise<any>;
    getBadClients(): Promise<any>;
    getClientsByPDF(): void;
    createClient(clientDto: ClientDto): void;
    deleteClient(id: string): void;
    updateClient(id: string, client: ClientPatchDto): void;
}
