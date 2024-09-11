import { ContractDto } from './dto/contract.dto';
export declare class ContractService {
    private conn;
    constructor(conn: any);
    getAllContract(): Promise<any>;
    getContractFilter(): Promise<any>;
    getContractMun(mun: string): Promise<any>;
    getCotnractByCliente(id: string): Promise<any>;
    getContractByMun(): Promise<any>;
    getPDFContract(): Promise<Buffer>;
    getPDFContractXModelo(): Promise<Buffer>;
    getPDFContractWorkerMun(mun: string): Promise<Buffer>;
    getPDFContractByMun(): Promise<Buffer>;
    createContract(contract: ContractDto): Promise<void>;
    updateContract(contract: ContractDto, matricula: string): void;
    deleteContract(idCliente: string, matricula: string): void;
}
