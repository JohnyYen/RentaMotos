export declare class PagosService {
    private conn;
    constructor(conn: any);
    getAllPagos(): Promise<any>;
    getAllPagosByMun(mun: string): Promise<any>;
}
