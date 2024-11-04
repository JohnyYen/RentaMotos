import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { ClientDto } from './dto/client.dto';
import generatePDF from 'src/libs/pdfKit';
import { arrayFormatter } from 'src/libs/jsonFormatter';
import { log } from 'console';
import { ErrorHandler } from 'src/libs/errorHandler';
import { PgService } from 'src/pg/pg.service';

@Injectable()
export class ClientService {
    
    constructor (@Inject(PG_CONNECTION) private conn : any, private pgService: PgService){}

    async getAllClients(pageSize:number=1, page:number=1) {
        return await this.pgService.pagination('cliente_view');
        const res = await this.conn.query(`SELECT * FROM cliente_view LIMIT ${pageSize} OFFSET ${(page-1) * pageSize}`);
        return res.rows;
    }

    async getClientByMun(mun:string){
        return await this.pgService.pagination(`cliente_view WHERE municipio = '${mun}'`);

        const res = await this.conn.query(`SELECT * FROM cliente_view WHERE municipio = '${mun}'`);
        return res.rows;
    }

    async getClient(id : string){
        return await this.pgService.pagination(`cliente WHERE idcliente = '${id}'`);

        const res = await this.conn.query(`SELECT * FROM cliente WHERE idcliente = '${id}'`);
        return res.rows;
    }

    async getAllClientByPDF() {
        const client = await this.pgService.execute('SELECT * FROM cliente_view');

        if(client.length === 0)
            throw new NotAcceptableException('La lista de Clientes esta vacia');
        return await generatePDF(Object.keys(client[0]), arrayFormatter(client));
    }

    async getAllClientPDFWorkerMun(mun:string) {
        const client = await this.pgService.execute(`SELECT * FROM cliente_view WHERE municipio = '${mun}'`)
        if(client.length === 0)
            throw new NotAcceptableException('La lista de clientes por municipio esta vacia');
        return await generatePDF(Object.keys(client[0]), arrayFormatter(client));
    }

    async validatePhoneNumber(num : string){
        try {
            //return await this.pgService.pagination('')
            const res = await this.conn.query(`SELECT * FROM cliente WHERE numcont = '${num}'`);
            return res.rows.length !== 0;
        } catch (error) {
            throw new ErrorHandler(error);
        }
    }

    async deleteClient(id : string){
        return await this.pgService.execute(`DELETE FROM cliente where idcliente = '${id}'`);
        this.conn.query(`DELETE FROM cliente where idcliente = '${id}'`);
    }

    async createClient (client : ClientDto) {
        return await this.pgService.execute(`INSERT INTO cliente values ('${client.idCliente}', '${client.nombre}', '${client.segNombre}', '${client.primApellido}', '${client.segApellido}', ${client.edad}, '${client.municipio}', '${client.sexo}', '${client.numCont}')`)
        this.conn.query(`INSERT INTO cliente values ('${client.idCliente}', '${client.nombre}', '${client.segNombre}', '${client.primApellido}', '${client.segApellido}', ${client.edad}, '${client.municipio}', '${client.sexo}', '${client.numCont}')`);
    }

    async updateClient(client : ClientDto, id : string){
        return await this.pgService.execute(`UPDATE cliente SET edad = ${client.edad},municipio = '${client.municipio}' ,nombre = '${client.nombre}', segNombre = '${client.segNombre}', primApellido = '${client.primApellido}', segApellido = '${client.segApellido}', numcont = '${client.numCont}'  WHERE idcliente = '${id}'`)
        this.conn.query(`UPDATE cliente SET edad = ${client.edad},municipio = '${client.municipio}' ,nombre = '${client.nombre}', segNombre = '${client.segNombre}', primApellido = '${client.primApellido}', segApellido = '${client.segApellido}', numcont = '${client.numCont}'  WHERE idcliente = '${id}'`)
    }

    async getAllBadClients(){
        return await this.pgService.execute(` clientesIncumplidores()`);
        const res = await this.conn.query(`SELECT * FROM clientesIncumplidores()`);
        return res.rows;
    }

    async getPDFBadClients(){
        const client = await this.pgService.execute(`SELECT * FROM clientesIncumplidores()`);

        if(client.length === 0)
            throw new NotAcceptableException('La lista de Clientes Incumplidores esta vacia');
        return await generatePDF(Object.keys(client[0]), arrayFormatter(client));
    }

    async getAllMun(){
        return await this.pgService.execute('select * from municipio');

        const res = await this.conn.query('select * from municipio');
        return res.rows;
    }
}