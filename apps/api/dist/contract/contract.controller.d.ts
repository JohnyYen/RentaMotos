import { ContractService } from './contract.service';
import { ContractDto } from './dto/contract.dto';
import { ContractPatchDto } from './dto/contractPatch.dto';
export declare class ContractController {
    private readonly contractService;
    constructor(contractService: ContractService);
    getContract(): Promise<any>;
    getContractInPDF(res: any): Promise<void>;
    getContractByMun(): Promise<any>;
    getContractInPDFMun(res: any): Promise<void>;
    getFilterContract(): Promise<any>;
    getContractInPDFMarc(res: any): Promise<void>;
    deleteContract(idCliente: string, matricula: string): void;
    createContract(contract: ContractDto): void;
    updateContract(idCliente: string, matricula: string, contract: ContractPatchDto): void;
}
