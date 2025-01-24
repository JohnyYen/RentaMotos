import { ContractService } from './contract.service';
import { ContractDto } from './dto/contract.dto';
import { FormaPagoDto } from './dto/formaPago.dto';
export declare class ContractController {
    private readonly contractService;
    constructor(contractService: ContractService);
    getAllFormaPago(): Promise<any>;
    getContract(): Promise<any>;
    getContractInPDF(res: any): Promise<void>;
    getContractsMunWorker(mun: string): Promise<any>;
    getPDFContractWorkerMun(mun: string, res: any): Promise<void>;
    getContractByMun(): Promise<any>;
    getContractInPDFMun(res: any): Promise<void>;
    getFilterContract(): Promise<any>;
    getContractInPDFMarc(res: any): Promise<void>;
    getAllPagos(): Promise<any>;
    getAllPagosPDF(res: any): Promise<void>;
    getAllPagosPDFMun(res: any, mun: string): Promise<void>;
    getAllPagosByMun(mun: string): Promise<any>;
    getContractByCliente(id: string): Promise<any>;
    createContract(contract: ContractDto): Promise<void>;
    createFormaPago(form: FormaPagoDto): Promise<void>;
    updateContract(matricula: string, contract: ContractDto): Promise<void>;
    updateFormaPago(body: FormaPagoDto, id: string): Promise<void>;
    deleteFormaPago(id: string): Promise<void>;
    deleteContract(matricula: string): Promise<void>;
}
