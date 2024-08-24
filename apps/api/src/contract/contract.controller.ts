import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractDto } from './dto/contract.dto';
import { ContractPatchDto } from './dto/contractPatch.dto';

@Controller('api/contract')
export class ContractController {
    constructor(private readonly contractService : ContractService){}

    @Get()
    async getContract(){
        return await this.contractService.getAllContract();
    }

    @Get("/pdf")
    getContractInPDF(){

    }

    @Get('/mun')
    async getContractByMun(){
        return await this.contractService.getContractByMun();
    }

    @Get('/marcxmodel')
    async getFilterContract(){
        return await this.contractService.getContractFilter();
    }
    @Delete('/:idCliente/:matricula')
    deleteContract(@Param("idCliente") idCliente : string, @Param("matricula") matricula : string){
        this.contractService.deleteContract(idCliente, matricula);
    }

    @Post()
    createContract(@Body("contract") contract : ContractDto){
        this.contractService.createContract(contract);
    }
    @Patch('/:idClient/:matricula')
    updateContract(@Param("idCliente") idCliente : string, @Param("matricula") matricula : string, contract : ContractPatchDto){
        this.contractService.updateContract(contract, idCliente, matricula);
    }
}