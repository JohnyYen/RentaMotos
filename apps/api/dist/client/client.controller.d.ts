import { ClientService } from './client.service';
import { ClientDto } from './dto/client.dto';
export declare class ClientController {
    private clientService;
    constructor(clientService: ClientService);
    getClients(): Promise<any>;
    getClientesByMun(mun: string): Promise<any>;
    getClientsByPDF(res: any): Promise<void>;
    getBadClients(): Promise<any>;
    getClient(id: string): Promise<any>;
    getBadClientsByPDF(res: any): Promise<void>;
    getPDF(mun: string, res: any): Promise<void>;
    createClient(clientDto: ClientDto): void;
    deleteClient(id: string): void;
    updateClient(id: string, client: ClientDto): void;
    validateNumber(body: any): Promise<boolean>;
}
