import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { FormaPagoDto } from './dto/formaPago.dto';

@Injectable()
export class FormaPagoService {
    constructor(@Inject(PG_CONNECTION) private conn : any){}

    async getAllFormaPago(){
        const res = await this.conn.query('SELECT * FROM formaPago');

        return res.rows;
    }

    async createFormaPago(formaPago : FormaPagoDto){
        await this.conn.query(`INSERT INTO formaPago values ('${formaPago.formaPago}')`);
    }

    async deleteFormaPago(formaPago : string){
        await this.conn.query(`DELETE FROM formaPago WHERE formaPago = '${formaPago}'`);
    }

    async updateFormaPago(formaPago : FormaPagoDto, changeFormaPago : string){
        await this.conn.query(`UPDATE FROM formaPago SET formaPago = '${formaPago.formaPago}' WHERE formapago = '${changeFormaPago}'`);
    }
}
