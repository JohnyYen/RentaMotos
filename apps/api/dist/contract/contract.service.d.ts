import { ContractDto } from './dto/contract.dto';
import { ContractPatchDto } from './dto/contractPatch.dto';
export declare class ContractService {
    private conn;
    constructor(conn: any);
    getAllContract(): Promise<any>;
    createContract(contract: ContractDto): void;
    updateContract(contract: ContractPatchDto, idCliente: string, matricula: string): void;
    deleteContract(idCliente: string, matricula: string): void;
}
