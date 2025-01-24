import { BadRequestException, Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { ContractDto } from './dto/contract.dto';
import generatePDF from 'src/libs/pdfKit';
import { arrayFormatter } from 'src/libs/jsonFormatter';
import { ErrorHandler } from 'src/libs/errorHandler';
import { FormaPagoDto } from './dto/formaPago.dto';
import { PgService } from 'src/pg/pg.service';
import { MailsService } from 'src/mails/mails.service';
import { checkInternetConnection } from 'src/libs/checkInternet';

@Injectable()
export class ContractService {
    constructor (@Inject(PG_CONNECTION) private conn : any, private pgService: PgService
    , private mailService: MailsService){}

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
        const contract = await this.pgService.execute(`SELECT * FROM contrato_view`);
        // if(contract.length === 0)
        //     throw new BadRequestException('La lista de contratos esta vacia');
        return await generatePDF(Object.keys(contract[0]), arrayFormatter(contract));
    }

    async getPDFContractXModelo(){
        const contract = await this.pgService.execute(`select * from contratoxmarca_modelo`);
        if(contract.length === 0)
            throw new NotAcceptableException('La lista de contratos por marca y modelo esta vacia');
        return await generatePDF(Object.keys(contract[0]), arrayFormatter(contract));
    }

    async getPDFContractWorkerMun(mun:string){
        const contract = await this.pgService.execute(`SELECT * FROM cont_mun_view WHERE municipio = '${mun}'`);

        if(contract.length === 0)
            throw new NotAcceptableException('La lista de contratos por municipio esta vacia');
        return await generatePDF(Object.keys(contract[0]), arrayFormatter(contract));
    }

    async getPDFContractByMun(){
        const contract = await this.pgService.execute(`select * from cont_mun`);

        if(contract.length === 0)
            throw new NotAcceptableException('La lista de contratos por municipio esta vacia');
        return await generatePDF(Object.keys(contract[0]), arrayFormatter(contract));
    }


    async createContract(contract : ContractDto){
        try{
            console.log(contract);
            const response = await this.conn.query(`SELECT nombre_usuario, email FROM public.usuario where id_cliente = '${contract.idCliente}'`);
            const user = response.rows[0];
            await this.conn.query(`INSERT INTO Contrato values ('${contract.idCliente}', '${contract.matricula}', '${contract.beginDate}'::date, '${contract.endDate}'::date, '${contract.firmaDate}'::date, '${contract.formaPago}', ${contract.seguro}, ${contract.diasProrroga})`);
            
            if(await checkInternetConnection())
                this.mailService.sendEmail(user.nombre_usuario, user.email);
        }
        catch(error){
            return new ErrorHandler(error).returnError();
        }
    }

    async updateContract(contract : ContractDto, matricula : string){
        try {
            this.conn.query(`UPDATE Contrato SET forma_pago = '${contract.formaPago}', fecha_fin = '${contract.endDate}'::date ,seguro = '${contract.seguro}', dias_prorroga = ${contract.diasProrroga} WHERE matricula = '${matricula}'`);
        } catch (error) {
            throw new ErrorHandler(error).returnError();
        }
    }

    async deleteContract(matricula : string){
       try {
            this.conn.query(`DELETE FROM Contrato WHERE matricula = '${matricula}'`);
       } catch (error) {
            throw new ErrorHandler(error).returnError();
       }
    }

    async getAllFormaPago(){

        const res = await this.conn.query('SELECT * FROM formaPago');

        return res.rows;
    }

    async createFormaPago(formaPago : FormaPagoDto){
        try {
            await this.conn.query(`INSERT INTO formaPago values ('${formaPago.formaPago}')`);
        } catch (error) {
            throw new ErrorHandler(error).returnError();
        }
    }

    async deleteFormaPago(formaPago : string){
       try {
            await this.conn.query(`DELETE FROM formaPago WHERE formaPago = '${formaPago}'`);
       } catch (error) {
            throw new ErrorHandler(error).returnError();
       }
    }

    async updateFormaPago(formaPago : FormaPagoDto, changeFormaPago : string){
       try {
        await this.conn.query(`UPDATE formaPago SET formaPago = '${formaPago.formaPago}' WHERE formapago = '${changeFormaPago}'`);
       } catch (error) {
            throw new ErrorHandler(error).returnError();
       }
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
