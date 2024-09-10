import { FormaPagoService } from './forma-pago.service';
import { FormaPagoDto } from './dto/formaPago.dto';
export declare class FormaPagoController {
    private formaPagoService;
    constructor(formaPagoService: FormaPagoService);
    getAllFormaPago(): Promise<any>;
    createFormaPago(form: FormaPagoDto): void;
    deleteFormaPago(form: string): void;
    updateFormaPago(body: FormaPagoDto, id: string): void;
}
