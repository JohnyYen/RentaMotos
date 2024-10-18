import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { MotorcycleDto } from './dto/motorcycle.dto';
import { arrayFormatter } from 'src/libs/jsonFormatter';
import generatePDF from 'src/libs/pdfKit';
import { MarcDto } from './dto/marc.dto';
import { ModelDto } from './dto/model.dto';

@Injectable()
export class MotorcycleService {
    constructor(@Inject(PG_CONNECTION) private conn : any){}

    async getAllMotorcycle(){
        const res = await this.conn.query("SELECT * FROM moto_view");
        return await res.rows;
    }

    async getMotoClient(){
        const res = await this.conn.query("SELECT * FROM moto_view WHERE situacion = 'Disponible'");
        return res.rows;
    }

    async getPDF(){
        const moto = await this.getAllMotorcycle();
        if(moto.length === 0)
            throw new NotAcceptableException('La lista de motos esta vacia');
        return await generatePDF(Object.keys(moto[0]), arrayFormatter(moto));
    }

    async getSituation(){
        const res = await this.conn.query('SELECT * FROM situacion');
        return res.rows;
    }

    async getPDFSituation(){
        const moto = await this.getSituationMoto();
        if(moto.length === 0)
            throw new NotAcceptableException('La lista de la situacion de las motos esta vacia');
        return await generatePDF(Object.keys(moto[0]), arrayFormatter(moto));
    }

    async deleteMotorcycle( id : string){
        // try {
             await this.conn.query(`DELETE FROM moto WHERE moto.matricula = '${id}'`);
        // } catch (error) {
        //     console.log('Ocurrio un error');
        // }
    }

    async getMarc() {
        const res = await  this.conn.query('SELECT nommarca FROM marca');
        return res.rows;
    }

    async deleteMarc(marc : string) {
        await this.conn.query(`DELETE FROM marca WHERE nommarca = '${marc}'`);
    }

    async createMarc(nommarca : MarcDto) {
        await this.conn.query(`INSERT INTO marca VALUES ('${nommarca.nommarca}')`);
    }

    async updateMarc(marc : MarcDto, id : string){
        await this.conn.query(`UPDATE marca SET nommarca = '${marc.nommarca}' WHERE nommarca = '${id}'`);
    }
    async createMotorcycle (moto : MotorcycleDto){
        await this.conn.query(`INSERT INTO moto values ('${moto.matricula}', '${moto.color}', ${moto.cantKm}, '${moto.marca}', '${moto.modelo}', '${moto.situacion}')`);
    }

    async updateMotorcycle (moto : MotorcycleDto, id : string){
        this.conn.query(`UPDATE moto SET cantkm = ${moto.cantKm}, color = '${moto.color}', situacion = '${moto.situacion}' WHERE matricula = '${id}'`);
    }

    async getSituationMoto(){
        const res = await this.conn.query('SELECT * FROM SituacionMoto()');
        return res.rows;
    }

    async getModels(){
        const res = await this.conn.query('SELECT * FROM modelo');
        return res.rows;
    }

    async deleteModels(nomModelo : string) {
        console.log(nomModelo);
        await this.conn.query(`DELETE FROM modelo WHERE nommodelo = '${nomModelo}'`);
    }

    async createModels(model : ModelDto) {
        await this.conn.query(`INSERT INTO modelo values ('${model.nomModelo}' , '${model.nomMarca}')`);
    }

    async updateModel(model : ModelDto, nomModel : string){
        this.conn.query(`UPDATE modelo SET nomModelo = '${model.nomModelo}' WHERE nommodelo = '${nomModel}'`);
    }
}
