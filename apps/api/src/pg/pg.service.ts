import { Injectable } from '@nestjs/common';
import {Pool} from 'pg'
@Injectable()
export class PgService {
    private pool : Pool;

    constructor() {
        this.pool = new Pool({
            user: process.env.USER,
            host: process.env.HOST,
            database: process.env.DATABASE,
            password: process.env.PASSWORD,
            port: process.env.PORT
        });
    }

    async execute(query:string, params?: any[]): Promise<any>{
        const client = await this.pool.connect();
        try {
            const result = await client.query(query, params);
            return result.rows;
        } catch (error) {
            
        }
        finally{
            client.release();
        }
    }

    async pagination(table:string, page: number = 1, limit: number = 10, orderBy:string='id', orderDirection:string = 'ASC'){
        const limitTable = table + ` LIMIT ${limit} OFFSET ${(page-1) * limit}`
        const query =`SELECT * FROM `+ limitTable;
        const response = await this.execute(query);

        return {
            data: response,
            count: await this.getTotalCount(limitTable)
        }
    }

    private async getTotalCount(table: string){
        const response = await this.execute(`SELECT COUNT(*) FROM ` + table);
        return response[0].count;
    }
}
