import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { ContractDto } from './dto/contract.dto';
import { ContractPatchDto } from './dto/contractPatch.dto';

@Injectable()
export class ContractService {
    constructor (@Inject(PG_CONNECTION) private conn : any){}

    async getAllContract(){
        const res = await this.conn.query("SELECT * FROM contrato_view");
        return res.rows;
    }

    createContract(contract : ContractDto){
        //await this.conn.query("")
    }

    updateContract(contract : ContractPatchDto, idCliente : string, matricula : string){
        
    }

    deleteContract(idCliente : string, matricula : string){
        this.conn.query(`DELETE FROM Contrato where idcliente = '${idCliente} and matricula = '${matricula}'`)
    }
}
