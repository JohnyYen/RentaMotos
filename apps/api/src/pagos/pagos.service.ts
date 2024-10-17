import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
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
        let counter = 0;
        console.log(list);
        for(const e of Object.values(list[0])){
           if(e === null)
            counter++;
        }
        console.log(list);
        console.log(counter);
        if(counter === 13)
            throw new NotAcceptableException('La lista de Pagos esta vacia');
        else
            return await generatePDF(Object.keys(list[0]), arrayFormatter(list));
    }

    async getAllPagosByPDF(mun : string){
        const list = await this.getAllPagosByMun(mun);
        if(list.length === 0)
            throw new NotAcceptableException('La lista de Pagos esta vacia');
        else
            return await generatePDF(Object.keys(list[0]), arrayFormatter(list));
    }
}
