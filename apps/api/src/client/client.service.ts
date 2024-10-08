import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { ClientDto } from './dto/client.dto';
import generatePDF from 'src/libs/pdfKit';
import { arrayFormatter } from 'src/libs/jsonFormatter';
import { log } from 'console';
import { ErrorHandler } from 'src/libs/errorHandler';

@Injectable()
export class ClientService {
    
    constructor (@Inject(PG_CONNECTION) private conn : any){}

    async getAllClients() {
        const res = await this.conn.query('SELECT * FROM cliente_view');
        return res.rows;
    }

    async getClientByMun(mun:string){
        const res = await this.conn.query(`SELECT * FROM cliente_view WHERE municipio = '${mun}'`);
        return res.rows;
    }

    async getClient(id : string){
        const res = await this.conn.query(`SELECT * FROM cliente WHERE idcliente = '${id}'`);
        return res.rows;
    }

    async getAllClientByPDF() {
        const client = await this.getAllClients();

        if(client.length === 0)
            throw new NotAcceptableException('La lista de Clientes esta vacia');
        return await generatePDF(Object.keys(client[0]), arrayFormatter(client));
    }

    async getAllClientPDFWorkerMun(mun:string) {
        const client = await this.getClientByMun(mun);
        if(client.length === 0)
            throw new NotAcceptableException('La lista de clientes por municipio esta vacia');
        return await generatePDF(Object.keys(client[0]), arrayFormatter(client));
    }

    async validatePhoneNumber(num : string){
        try {
            const res = await this.conn.query(`SELECT * FROM cliente WHERE numcont = '${num}'`);
            return res.rows.length !== 0;
        } catch (error) {
            throw new ErrorHandler(error);
        }
    }

    async deleteClient(id : string){
        this.conn.query(`DELETE FROM cliente where idcliente = '${id}'`);
    }

    async createClient (client : ClientDto) {
        this.conn.query(`INSERT INTO cliente values ('${client.idCliente}', '${client.nombre}', '${client.segNombre}', '${client.primApellido}', '${client.segApellido}', ${client.edad}, '${client.municipio}', '${client.sexo}', '${client.numCont}')`);
    }

    async updateClient(client : ClientDto, id : string){

        this.conn.query(`UPDATE cliente SET edad = ${client.edad},municipio = '${client.municipio}' ,nombre = '${client.nombre}', segNombre = '${client.segNombre}', primApellido = '${client.primApellido}', segApellido = '${client.segApellido}', numcont = '${client.numCont}'  WHERE idcliente = '${id}'`)
    }

    async getAllBadClients(){
        const res = await this.conn.query(`SELECT * FROM clientesIncumplidores()`);
        return res.rows;
    }

    async getPDFBadClients(){
        const client = await this.getAllBadClients();

        if(client.length === 0)
            throw new NotAcceptableException('La lista de Clientes Incumplidores esta vacia');
        return await generatePDF(Object.keys(client[0]), arrayFormatter(client));
    }
}