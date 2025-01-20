import { ClientService } from './client.service';
import { ClientDto } from './dto/client.dto';
export declare class ClientController {
    private clientService;
    constructor(clientService: ClientService);
    getClients(): Promise<any>;
    getClientsByPDF(res: any): Promise<void>;
    getAllMun(): Promise<any>;
    getClientesByMun(mun: string): Promise<any>;
    getBadClients(): Promise<any>;
    getBadClientsByPDF(res: any): Promise<void>;
    getClient(id: string): Promise<any>;
    getPDF(mun: string, res: any): Promise<void>;
    createClient(clientDto: ClientDto): Promise<any>;
    validateNumber(body: any): Promise<boolean>;
    updateClient(id: string, client: ClientDto): Promise<any>;
    deleteClient(id: string): Promise<void>;
}
