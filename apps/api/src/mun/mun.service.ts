import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';

@Injectable()
export class MunService {
    constructor(@Inject(PG_CONNECTION) private conn : any){}

    async getAllMun(){
        const res = await this.conn.query('select * from municipio');
        return res.rows;
    }
}
