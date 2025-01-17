import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { MotorcycleDto } from './dto/motorcycle.dto';
import { arrayFormatter } from 'src/libs/jsonFormatter';
import generatePDF from 'src/libs/pdfKit';
import { MarcDto } from './dto/marc.dto';
import { ModelDto } from './dto/model.dto';
import { PgService } from 'src/pg/pg.service';
import { ErrorHandler } from 'src/libs/errorHandler';
import { MotorcyclePartial } from './dto/motorcyclePartial.dto';

@Injectable()
export class MotorcycleService {
    constructor(@Inject(PG_CONNECTION) private conn : any, private pgService : PgService){}

    async getAllMotorcycle(){
        //return await this.pgService.pagination('moto_view');
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

    async deleteMotorcycle( id : number){
        try {
             await this.conn.query(`DELETE FROM moto WHERE id_moto = '${id}'`);
        } catch (error) {
            throw new ErrorHandler(error).returnError();
        }
    }

    async getMarc() {
        const res = await  this.conn.query('SELECT nom_marca FROM marca');

        console.log(res.rows);
        
        return res.rows;
    }

    async deleteMarc(marc : number) {
        try {
            await this.conn.query(`DELETE FROM marca WHERE id_marca = '${marc}'`);
        } catch (error) {
            throw new ErrorHandler(error).returnError();
        }

    }

    async createMarc(marca : MarcDto) {
        try {
            await this.conn.query(`INSERT INTO marca VALUES ('${marca.nomMarca}')`);
        } catch (error) {
            throw new ErrorHandler(error).returnError();
        }
    }

    async updateMarc(marc : MarcDto, id : number){
        try {
            await this.conn.query(`UPDATE marca SET nom_marca = '${marc.nomMarca}' WHERE id_marca = '${id}'`);
        } catch (error) {
            return new ErrorHandler(error).returnError();
        }
    }

    async createMotorcycle (moto : MotorcycleDto){
       try{
        //return await this.pgService.execute(`INSERT INTO moto values ('${moto.matricula}', '${moto.color}', ${moto.cantKm}, '${moto.marca}', '${moto.modelo}', '${moto.situacion}')`)
        return await this.conn.query(`INSERT INTO moto values ('${moto.matricula}', '${moto.color}', ${moto.cantKm}, '${moto.marca}', '${moto.modelo}', '${moto.situacion}')`);
       }catch(error){
            throw new ErrorHandler(error).returnError();
       }
    }

    async updateMotorcycle (moto : MotorcyclePartial, id : string){
        try {
            this.conn.query(`UPDATE moto SET cantkm = ${moto.cantKm}, color = '${moto.color}', situacion = '${moto.situacion}' WHERE matricula = '${id}'`);
        } catch (error) {
            throw new ErrorHandler(error).returnError();
        }
    }

    async getSituationMoto(){
        const res = await this.conn.query('SELECT * FROM SituacionMoto()');
        return res.rows;
    }

    async getModels(){
        const res = await this.conn.query('SELECT * FROM modelo');
        return res.rows;
    }

    async deleteModels(id : number) {
       try {
        await this.conn.query(`DELETE FROM modelo WHERE id_modelo = '${id}'`);
       } catch (error) {
        throw new ErrorHandler(error).returnError();
       }
    }

    async createModels(model : ModelDto) {
        try {
            await this.conn.query(`INSERT INTO modelo values ('${model.nomModelo}' , '${model.nomMarca}')`);
        } catch (error) {
            throw new ErrorHandler(error).returnError();
        }
    }

    async updateModel(model : ModelDto, id : number){
        try {
            this.conn.query(`UPDATE modelo SET nom_modelo = '${model.nomModelo}' WHERE id_modelo = '${id}'`);
        } catch (error) {
            throw new ErrorHandler(error).returnError();
        }
    }
}
