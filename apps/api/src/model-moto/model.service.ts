import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { ModelDto } from './dto/model.dto';

@Injectable()
export class ModelService {
    constructor(@Inject(PG_CONNECTION) private conn : any){}

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
