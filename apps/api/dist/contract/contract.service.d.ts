import { ContractDto } from './dto/contract.dto';
import { FormaPagoDto } from './dto/formaPago.dto';
import { PgService } from 'src/pg/pg.service';
export declare class ContractService {
    private conn;
    private pgService;
    constructor(conn: any, pgService: PgService);
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
    updateContract(contract: ContractDto, matricula: string): Promise<void>;
    deleteContract(matricula: string): Promise<void>;
    getAllFormaPago(): Promise<any>;
    createFormaPago(formaPago: FormaPagoDto): Promise<void>;
    deleteFormaPago(formaPago: string): Promise<void>;
    updateFormaPago(formaPago: FormaPagoDto, changeFormaPago: string): Promise<void>;
    getAllPagos(): Promise<any>;
    getAllPagosByMun(mun: string): Promise<any>;
    getAllPagosPDF(): Promise<Buffer>;
    getAllPagosByPDF(mun: string): Promise<Buffer>;
}
