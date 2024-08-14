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
        await this.conn.query(`DELETE FROM marca WHERE nommarca = ${marc}`);
    }

    async createMarc(marc : MarcDto) {
        console.log(marc);
        await this.conn.query(`INSERT INTO marca VALUES ('${marc.name}')`);
    }

}
