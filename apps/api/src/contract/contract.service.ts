import { BadRequestException, Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { ContractDto } from './dto/contract.dto';
import generatePDF from 'src/libs/pdfKit';
import { arrayFormatter } from 'src/libs/jsonFormatter';
import { ErrorHandler } from 'src/libs/errorHandler';
import { FormaPagoDto } from './dto/formaPago.dto';

@Injectable()
export class ContractService {
    constructor (@Inject(PG_CONNECTION) private conn : any){}

    async getAllContract(){
        const res = await this.conn.query("SELECT * FROM contrato_view");
        return res.rows;
    }

    async getContractFilter(){
        const res = await this.conn.query('select * from contratoxmarca_modelo')
        return res.rows;
    }

    async getContractMun(mun:string){
        const res = await this.conn.query(`SELECT * FROM cont_mun_view WHERE municipio = '${mun}'`)
        return res.rows;
    }

    async getCotnractByCliente(id : string){
        const res = await this.conn.query(`SELECT * FROM contrato_cliente_view WHERE idcliente = '${id}'`)
        return res.rows;
    }
    async getContractByMun(){
        const res = await this.conn.query('select * from cont_mun');
        return res.rows
    }

    async getPDFContract(){
        const contract = await this.getAllContract();
        if(contract.length === 0)
            throw new BadRequestException('La lista de contratos esta vacia');
        return await generatePDF(Object.keys(contract[0]), arrayFormatter(contract));
    }

    async getPDFContractXModelo(){
        const contract = await this.getContractFilter();
        if(contract.length === 0)
            throw new NotAcceptableException('La lista de contratos por marca y modelo esta vacia');
        return await generatePDF(Object.keys(contract[0]), arrayFormatter(contract));
    }

    async getPDFContractWorkerMun(mun:string){
        const contract = await this.getContractMun(mun);
        if(contract.length === 0)
            throw new NotAcceptableException('La lista de contratos por municipio esta vacia');
        return await generatePDF(Object.keys(contract[0]), arrayFormatter(contract));
    }

    async getPDFContractByMun(){
        const contract = await this.getContractByMun();

        if(contract.length === 0)
            throw new NotAcceptableException('La lista de contratos por municipio esta vacia');
        return await generatePDF(Object.keys(contract[0]), arrayFormatter(contract));
    }


    async createContract(contract : ContractDto){
        try{
            await this.conn.query(`INSERT INTO Contrato values ('${contract.idCliente}', '${contract.matricula}', '${contract.beginDate}'::date, '${contract.endDate}'::date, '${contract.firmaDate}'::date, '${contract.formaPago}', ${contract.seguro}, ${contract.diasProrroga})`);
        }
        catch(error){
            return new ErrorHandler(error).returnError();
        }
    }

    updateContract(contract : ContractDto, matricula : string){
        this.conn.query(`UPDATE Contrato SET formapago = '${contract.formaPago}', fechafin = '${contract.endDate}'::date ,seguro = '${contract.seguro}', diasprorroga = ${contract.diasProrroga} WHERE matricula = '${matricula}'`);
    }

    deleteContract(matricula : string){
        this.conn.query(`DELETE FROM Contrato WHERE matricula = '${matricula}'`);
    }

    async getAllFormaPago(){
        const res = await this.conn.query('SELECT * FROM formaPago');

        return res.rows;
    }

    async createFormaPago(formaPago : FormaPagoDto){
        await this.conn.query(`INSERT INTO formaPago values ('${formaPago.formaPago}')`);
    }

    async deleteFormaPago(formaPago : string){
        await this.conn.query(`DELETE FROM formaPago WHERE formaPago = '${formaPago}'`);
    }

    async updateFormaPago(formaPago : FormaPagoDto, changeFormaPago : string){
        await this.conn.query(`UPDATE formaPago SET formaPago = '${formaPago.formaPago}' WHERE formapago = '${changeFormaPago}'`);
    }

    async getAllPagos(){
        const res = await this.conn.query('SELECT * FROM pagos_view');
        return res.rows;
    }

    async getAllPagosByMun(mun : string){
        const res = await this.conn.query(`SELECT * FROM pagos_mun_view WHERE municipio = '${mun}'`);
        return res.rows;
    }

    async getAllPagosPDF(){
        const list = await this.getAllPagos();
        let counter = 0;
        console.log(list);
        for(const e of Object.values(list[0])){
           if(e === null)
            counter++;
        }
       
        if(counter === 13)
            throw new NotAcceptableException('La lista de Pagos esta vacia');
        else
            return await generatePDF(Object.keys(list[0]), arrayFormatter(list));
    }

    async getAllPagosByPDF(mun : string){
        const list = await this.getAllPagosByMun(mun);
        if(list.length === 0)
            throw new NotAcceptableException('La lista de Pagos esta vacia');
        else
            return await generatePDF(Object.keys(list[0]), arrayFormatter(list));
    }
}
