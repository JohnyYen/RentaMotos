import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { MarcDto } from './dto/marc.dto';

@Injectable()
export class MarcService {
    constructor (@Inject(PG_CONNECTION) private conn : any){}

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

}
