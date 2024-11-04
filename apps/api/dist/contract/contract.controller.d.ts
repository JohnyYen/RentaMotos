import { ContractService } from './contract.service';
import { ContractDto } from './dto/contract.dto';
import { FormaPagoDto } from './dto/formaPago.dto';
export declare class ContractController {
    private readonly contractService;
    constructor(contractService: ContractService);
    getContract(): Promise<any>;
    getContractInPDF(res: any): Promise<void>;
    getContractsMunWorker(mun: string): Promise<any>;
    getPDFContractWorkerMun(mun: string, res: any): Promise<void>;
    getContractByMun(): Promise<any>;
    getContractInPDFMun(res: any): Promise<void>;
    getFilterContract(): Promise<any>;
    getContractInPDFMarc(res: any): Promise<void>;
    getContractByCliente(id: string): Promise<any>;
    getAllPagos(): Promise<any>;
    getAllPagosPDF(res: any): Promise<void>;
    getAllPagosPDFMun(res: any, mun: string): Promise<void>;
    getAllPagosByMun(mun: string): Promise<any>;
    getAllFormaPago(): Promise<any>;
    createContract(contract: ContractDto): void;
    createFormaPago(form: FormaPagoDto): void;
    updateContract(matricula: string, contract: ContractDto): void;
    updateFormaPago(body: FormaPagoDto, id: string): void;
    deleteFormaPago(id: string): void;
    deleteContract(matricula: string): void;
}
