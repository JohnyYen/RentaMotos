import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { ContractDto } from './dto/contract.dto';
import generatePDF from 'src/libs/pdfKit';
import { arrayFormatter } from 'src/libs/jsonFormatter';

@Injectable()
export class ContractService {
    constructor (@Inject(PG_CONNECTION) private conn : any){}

    async getAllContract(){
        const res = await this.conn.query("SELECT * FROM contrato_view");
        return res.rows;
    }

    async getContractFilter(){
        const res = await this.conn.query('SELECT contratoxmarcamodelo()')
        return res.rows;
    }

    async getContractMun(mun:string){
        console.log(mun);
        const res = await this.conn.query(`SELECT * FROM cont_mun_view WHERE municipio = '${mun}'`)
        return res.rows;
    }

    async getCotnractByCliente(id : string){
        const res = await this.conn.query(`SELECT * FROM contrato_cliente_view WHERE idcliente = ${id}`)
        return res.rows;
    }
    async getContractByMun(){
        const res = await this.conn.query('select * from cont_mun');
        return res.rows
    }

    async getPDFContract(){
        const contract = await this.getAllContract();
        return await generatePDF(Object.keys(contract[0]), arrayFormatter(contract));
    }

    async getPDFContractXModelo(){
        const contract = await this.getContractFilter();
        return await generatePDF(Object.keys(contract[0]), arrayFormatter(contract));
    }

    async getPDFContractByMun(){
        const contract = await this.getContractByMun();
        return await generatePDF(Object.keys(contract[0]), arrayFormatter(contract));
    }


    async createContract(contract : ContractDto){
        console.log(contract);
        await this.conn.query(`INSERT INTO Contrato values ('${contract.idCliente}', '${contract.matricula}', '${contract.beginDate}'::date, '${contract.endDate}'::date, '${contract.firmaDate}'::date, '${contract.formaPago}', ${contract.seguro}, ${contract.diasProrroga})`);
    }

    updateContract(contract : ContractDto, idCliente : string, matricula : string){
        this.conn.query(`UPDATE Contrato SET formapago = ${contract.formaPago}, seguro = ${contract.seguro}, diasprorroga = ${contract.diasProrroga} WHERE idcliente = ${idCliente} AND matricula = ${matricula}`);
    }

    deleteContract(idCliente : string, matricula : string){
        this.conn.query(`DELETE FROM Contrato where idcliente = '${idCliente} and matricula = '${matricula}'`)
    }
}
