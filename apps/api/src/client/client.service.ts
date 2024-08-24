import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { ClientDto } from './dto/client.dto';
import { ClientPatchDto } from './dto/clientPatch.dto';

@Injectable()
export class ClientService {
    constructor (@Inject(PG_CONNECTION) private conn : any){}

    async getAllClients() {
        const res = await this.conn.query('SELECT * FROM client_view');
        return res.rows;
    }

    getAllClientByPDF() {

    }

    async deleteClient(id : string){
        this.conn.query(`DELETE FROM cliente where idcliente = '${id}'`);
    }

    async createClient (client : ClientDto) {
        this.conn.query(`INSERT INTO cliente values ('${client.idCliente}', '${client.nombre}', '${client.segNombre}', '${client.primApellido}', '${client.segApellido}', ${client.edad}, '${client.municipio}', '${client.sexo}', '${client.numcont}')`);
    }

    async updateClient(client : ClientPatchDto, id : string){
        this.conn.query(`UPDATE cliente SET edad = ${client.edad}, nombre = '${client.nombre}', segNombre = '${client.segNombre}', primApellido = '${client.primApellido}', segApellido = '${client.segApellido}', numcont = '${client.numcont}'  WHERE idcliente = '${client.idCliente}'`)
    }

    async getAllBadClients(){
        const res = await this.conn.query(`SELECT * FROM clientesIncumplidores()`);
        return res.rows;
    }
}
