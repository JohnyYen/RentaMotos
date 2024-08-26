import { Module } from "@nestjs/common";
import { PG_CONNECTION } from "../constants";
import { Pool, types } from "pg";
import * as dotenv from 'dotenv';
import * as path from 'path';

//Configuracion de las variables de entorno
dotenv.config({path: path.resolve(__dirname, '../../../../.env')});


const TYPE_DATE = 1082;
types.setTypeParser(TYPE_DATE, date => date);

const PgProvider = {

    provide: PG_CONNECTION,
    useValue: new Pool({
<<<<<<< HEAD
        user: 'postgres',
        host: 'localhost',
        database: 'RentaMotos',
        password: 'FernaBS2002*',
        port: 5432
    }
    )
=======
        user: process.env.USER,
        host: process.env.HOST,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: process.env.PORT
    })
>>>>>>> 1a2efeef8696c6eed66a896d65e4354c871f8f51
}

@Module({
    providers: [PgProvider],
    exports: [PgProvider]
})
export class PgModule {}