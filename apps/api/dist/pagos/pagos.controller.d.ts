import { PagosService } from './pagos.service';
export declare class PagosController {
    private readonly pagosService;
    constructor(pagosService: PagosService);
    getAllPagos(): Promise<any>;
    getAllPagosPDF(res: any): Promise<void>;
    getAllPagosPDFMun(res: any, mun: string): Promise<void>;
    getAllPagosByMun(mun: string): Promise<any>;
}
