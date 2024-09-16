import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { arrayFormatter } from 'src/libs/jsonFormatter';
import generatePDF from 'src/libs/pdfKit';

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

    async getAllPagosPDF(){
        const list = await this.getAllPagos();
        return await generatePDF(Object.keys(list[0]), arrayFormatter(list));
    }

    async getAllPagosByPDF(mun : string){
        const list = await this.getAllPagosByMun(mun);
        return await generatePDF(Object.keys(list[0]), arrayFormatter(list));
    }
}
