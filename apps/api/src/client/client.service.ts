import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { ClientDto } from './dto/client.dto';
import generatePDF from 'src/libs/pdfKit';
import { arrayFormatter } from 'src/libs/jsonFormatter';
import { ErrorHandler } from 'src/libs/errorHandler';
import { PgService } from 'src/pg/pg.service';

@Injectable()
export class ClientService {
    
    constructor (@Inject(PG_CONNECTION) private conn : any, private pgService: PgService){}

    /**
     * Funcion que devuelve los clientes de forma paginada
     * @param pageSize 
     * @param page 
     * @returns Todos los clientes en forma de pagina
     */
    async getAllClients(pageSize:number=1, page:number=1) {
        //return await this.pgService.pagination('cliente_view');
        const res = await this.conn.query(`SELECT * FROM cliente_view`);
        return res.rows;
    }

    /**
     * Función que retorna todos los clientes de un municipio de forma paginada
     * @param mun Municipio 
     * @returns Todos los clientes de un municipio en especifico
     */
    async getClientByMun(mun:string){
        //return await this.pgService.pagination(`cliente_view WHERE municipio = '${mun}'`);

        const res = await this.conn.query(`SELECT * FROM cliente_view WHERE municipio = '${mun}'`);
        return res.rows;
    }

    /**
     * Función que devuelve la información del cliente
     * @param id Identificador del Cliente
     * @returns Devuelve solamente el cliente
     */
    async getClient(id : string){
        //return await this.pgService.pagination(`cliente WHERE idcliente = '${id}'`);

        const res = await this.conn.query(`SELECT * FROM cliente WHERE id_cliente = '${id}'`);
        return res.rows;
    }

    /**
     * 
     * @returns PDF con la información de los clientes
     */
    async getAllClientByPDF() {
        const client = await this.pgService.execute('SELECT * FROM cliente_view');

        if(client.length === 0)
            throw new NotAcceptableException('La lista de Clientes esta vacia');
        return await generatePDF(Object.keys(client[0]), arrayFormatter(client));
    }

    /**
     * 
     * @param mun Municipio
     * @returns 
     */
    async getAllClientPDFWorkerMun(mun:string) {
        const client = await this.pgService.execute(`SELECT * FROM cliente_view WHERE municipio = '${mun}'`)
        if(client.length === 0)
            throw new NotAcceptableException('La lista de clientes por municipio esta vacia');
        return await generatePDF(Object.keys(client[0]), arrayFormatter(client));
    }

    /**
     * 
     * @param num Número de telefono
     * @returns 
     */
    async validatePhoneNumber(num : string){
        try {
            //return await this.pgService.pagination('')
            const res = await this.conn.query(`SELECT * FROM cliente WHERE numcont = '${num}'`);
            return res.rows.length !== 0;
        } catch (error) {
            throw new ErrorHandler(error);
        }
    }

    /**
     * Función que elimina a un cliente dado un identificador
     * @param id Identificador del cliente
     * @returns 
     */
    async deleteClient(id : number){
        try {
            //return await this.pgService.execute(`DELETE FROM cliente where idcliente = '${id}'`);
            this.conn.query(`DELETE FROM cliente where idcliente = '${id}'`);
            console.log("dsdsdsdsds");
        } catch (error) {
            throw new ErrorHandler(error).returnError();
        }
    }

    /**
     * Función que crea un nuevo cliente
     * @param client El DTO del cliente
     * @returns 
     */
    async createClient (client : ClientDto) {
        try {
           // return await this.pgService.execute(`INSERT INTO cliente values ('${client.idCliente}', '${client.nombre}', '${client.segNombre}', '${client.primApellido}', '${client.segApellido}', ${client.edad}, '${client.municipio}', '${client.sexo}', '${client.numCont}')`)
            return await this.conn.query(`INSERT INTO cliente values ('${client.idCliente}', '${client.nombre}', '${client.segNombre}', '${client.primApellido}', '${client.segApellido}', ${client.edad}, '${client.municipio}', '${client.sexo}', '${client.numCont}')`);
        } catch (error) {
            throw new ErrorHandler(error).returnError();
        }
    }

    /**
     * Función que actualiza la información de los clientes
     * @param client El DTO de cliente
     * @param id Identificador del cliente
     * @returns 
     */
    async updateClient(client : ClientDto, id : string){
        try {
            //return await this.pgService.execute(`UPDATE cliente SET edad = ${client.edad},municipio = '${client.municipio}' ,nombre = '${client.nombre}', segNombre = '${client.segNombre}', primApellido = '${client.primApellido}', segApellido = '${client.segApellido}', numcont = '${client.numCont}'  WHERE idcliente = '${id}'`)
            return await this.conn.query(`UPDATE cliente SET edad = ${client.edad},municipio = '${client.municipio}' ,nombre = '${client.nombre}', seg_nombre = '${client.segNombre}', prim_apellido = '${client.primApellido}', seg_apellido = '${client.segApellido}', num_cont = '${client.numCont}'  WHERE idcliente = '${id}'`)
        } catch (error) {
            throw new ErrorHandler(error).returnError();
        }
    }

    /**
     * Función que devuelve 
     * @returns Todos los clientes incumplidores
     */
    async getAllBadClients(){
        //return await this.pgService.execute(` clientesIncumplidores()`);
        const res = await this.conn.query(`SELECT * FROM clientesIncumplidores()`);
        return res.rows;
    }

    /**
     * 
     * @returns Los clientes incumplidores en formato PDF
     */
    async getPDFBadClients(){
        const client = await this.pgService.execute(`SELECT * FROM clientesIncumplidores()`);

        if(client.length === 0)
            throw new NotAcceptableException('La lista de Clientes Incumplidores esta vacia');
        return await generatePDF(Object.keys(client[0]), arrayFormatter(client));
    }

    /**
     * 
     * @returns Todos los municipios
     */
    async getAllMun(){
        //return await this.pgService.execute('select * from municipio');

        const res = await this.conn.query('select * from municipio');
        return res.rows;
    }
}