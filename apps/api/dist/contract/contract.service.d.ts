import { ContractDto } from './dto/contract.dto';
import { ContractPatchDto } from './dto/contractPatch.dto';
export declare class ContractService {
    private conn;
    constructor(conn: any);
    getAllContract(): Promise<any>;
    getContractFilter(): Promise<any>;
    getContractByMun(): Promise<any>;
    getPDFContract(): Promise<Buffer>;
    getPDFContractXModelo(): Promise<Buffer>;
    getPDFContractByMun(): Promise<Buffer>;
    createContract(contract: ContractDto): Promise<void>;
    updateContract(contract: ContractPatchDto, idCliente: string, matricula: string): void;
    deleteContract(idCliente: string, matricula: string): void;
}
