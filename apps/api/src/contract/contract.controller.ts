import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractDto } from './dto/contract.dto';

@Controller('api/contract')
export class ContractController {
    constructor(private readonly contractService : ContractService){}

    @Get()
    async getContract(){
        return await this.contractService.getAllContract();
    }

    @Get("/pdf")
    async getContractInPDF(@Res() res){
        const buffer = await this.contractService.getPDFContract();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Contracts.pdf');
        res.setHeader('Content-Length', buffer.length);
 
        res.send(buffer);
    }

    @Get('/:id')
    async getContractByCliente(@Param('id') id:string){
        return await this.contractService.getCotnractByCliente(id);
    }

    
    @Get('/mun')
    async getContractByMun(){
        return await this.contractService.getContractByMun();
    }

    @Get("/mun/pdf")
    async getContractInPDFMun(@Res() res){
        const buffer = await this.contractService.getPDFContractByMun();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=ContractsByMun.pdf');
        res.setHeader('Content-Length', buffer.length);
 
        res.send(buffer);
    }

    @Get('/marcxmodel')
    async getFilterContract(){
        return await this.contractService.getContractFilter();
    }

    @Get("/marcxmodel/pdf")
    async getContractInPDFMarc(@Res() res){
        const buffer = await this.contractService.getPDFContractXModelo();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=ContractsXModeloXMarca.pdf');
        res.setHeader('Content-Length', buffer.length);
 
        res.send(buffer);
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
    updateContract(@Param("idCliente") idCliente : string, @Param("matricula") matricula : string, contract : ContractDto){
        this.contractService.updateContract(contract, idCliente, matricula);
    }
}
