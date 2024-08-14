import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractDto } from './dto/contract.dto';
import { ContractPatchDto } from './dto/contractPatch.dto';

@Controller('api/contract')
export class ContractController {
    constructor(private readonly contractService : ContractService){}

    @Get()
    getContract(){
        return this.contractService.getAllContract();
    }

    @Get("/pdf")
    getContractInPDF(){

    }

    @Delete()
    deleteContract(@Body("idCliente") idCliente : string, @Body("matricula") matricula : string){
        this.contractService.deleteContract(idCliente, matricula);
    }

    @Post()
    createContract(@Body("contract") contract : ContractDto){
        this.contractService.createContract(contract);
    }
    @Patch()
    updateContract(@Body("idCliente") idCliente : string, @Body("matricula") matricula : string, contract : ContractPatchDto){
        this.contractService.updateContract(contract, idCliente, matricula);
    }
}
