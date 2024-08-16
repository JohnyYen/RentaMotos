import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { MotorcycleDto } from './dto/motorcycle.dto';
import { MotorcyclePatchDto } from './dto/motorcyclePatch.dto';

@Injectable()
export class MotorcycleService {
    constructor(@Inject(PG_CONNECTION) private conn : any){}

    async getAllMotorcycle(){
        const res = await this.conn.query("SELECT * FROM moto_view");
        return await res.rows;
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
}
