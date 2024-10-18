import { FormaPagoDto } from '../contract/dto/formaPago.dto';
export declare class FormaPagoService {
    private conn;
    constructor(conn: any);
    getAllFormaPago(): Promise<any>;
    createFormaPago(formaPago: FormaPagoDto): Promise<void>;
    deleteFormaPago(formaPago: string): Promise<void>;
    updateFormaPago(formaPago: FormaPagoDto, changeFormaPago: string): Promise<void>;
}
