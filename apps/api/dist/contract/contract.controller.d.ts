import { ContractService } from './contract.service';
import { ContractDto } from './dto/contract.dto';
import { ContractPatchDto } from './dto/contractPatch.dto';
export declare class ContractController {
    private readonly contractService;
    constructor(contractService: ContractService);
    getContract(): Promise<any>;
    getContractInPDF(): void;
    getFilterContract(): Promise<any>;
    deleteContract(idCliente: string, matricula: string): void;
    createContract(contract: ContractDto): void;
    updateContract(idCliente: string, matricula: string, contract: ContractPatchDto): void;
}
