import { PagosService } from './pagos.service';
export declare class PagosController {
    private readonly pagosService;
    constructor(pagosService: PagosService);
    getAllPagos(): Promise<any>;
    getAllPagosByMun(mun: string): Promise<any>;
}
