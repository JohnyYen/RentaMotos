import { Module } from "@nestjs/common";
import { PG_CONNECTION } from "../constants";
import { Pool } from "pg";

const PgProvider = {
    provide: PG_CONNECTION,
    useValue: new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'RentaMotos',
        password: 'FernaBS2002*',
        port: 5432
    }
    )
}

@Module({
    providers: [PgProvider],
    exports: [PgProvider]
})
export class PgModule {}