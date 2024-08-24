import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { MotorcycleDto } from './dto/motorcycle.dto';
import { MotorcyclePatchDto } from './dto/motorcyclePatch.dto';
import {Response} from 'express'
import buildPDF from 'src/libs/pdfKit';
import { arrayFormatter } from 'src/libs/jsonFormatter';

@Injectable()
export class MotorcycleService {
    constructor(@Inject(PG_CONNECTION) private conn : any){}

    async getAllMotorcycle(){
        const res = await this.conn.query("SELECT * FROM moto_view");
        return await res.rows;
    }

    async getPDF(res : Response){

        const stream = res.writeHead(200, {
            "Content-Type": "aplication/pdf",
            "Content-Disposition": "attachment; filename=employements.pdf",
        })

        const motors = await this.getAllMotorcycle();
        //console.log(arrayFormatter(motors));
       //console.log(stream);
       buildPDF(Object.keys(motors[0]), arrayFormatter(motors), (data) => stream.write(data), () => stream.end);

    //    res.setHeader('Content-Type', 'application/pdf');
    //    res.setHeader('Content-Disposition', 'attachment; filename=reporte.pdf');
    //    res.setHeader('Content-Length', build.length);
    //    res.send(build);
    }
    async deleteMotorcycle( id : string){
        try {
            await this.conn.query(`DELETE FROM moto WHERE moto.matricula = '${id}'`);
        } catch (error) {
            console.log('Ocurrio un error');
        }
    }

    async createMotorcycle (moto : MotorcycleDto){
        await this.conn.query(`INSERT INTO moto values ('${moto.matricula}', '${moto.color}', ${moto.cantKm}, '${moto.marca}', '${moto.modelo}', '${moto.situacion}')`);
    }

    async updateMotorcycle (moto : MotorcyclePatchDto, id : string){
        this.conn.query(`UPDATE moto SET cantkm = ${moto.cantKm}, color = '${moto.color}, situacion = '${moto.situacion}'' WHERE matricula = '${id}'`);
    }

    async getSituationMoto(){
        const res = await this.conn.query('SELECT * FROM SituacionMoto()');
        return res.rows;
    }
}
