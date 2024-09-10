import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';

@Injectable()
export class PagosService {
    constructor(@Inject(PG_CONNECTION) private conn : any){}

    async getAllPagos(){
        const res = await this.conn.query('SELECT * FROM pagos_view');
        return res.rows;
    }

    async getAllPagosByMun(mun : string){
        const res = await this.conn.query(`SELECT * FROM pagos_mun_view WHERE municipio = '${mun}'`);
        return res.rows;
    }
}
