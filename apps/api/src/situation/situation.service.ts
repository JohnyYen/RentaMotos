import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';

@Injectable()
export class SituationService {
    constructor(@Inject(PG_CONNECTION) private readonly conn:any){}

    async getSituation(){
        const res = await this.conn.query('SELECT * FROM situacion');
        return res.rows;
    }
}
