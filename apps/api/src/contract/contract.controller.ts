import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractDto } from './dto/contract.dto';
import { ErrorHandler } from 'src/libs/errorHandler';

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

    @Get('/worker/:mun')
    async getContractsMunWorker(@Param('mun') mun : string){
        return await this.contractService.getContractMun(mun);
    }

    @Get('/worker/pdf/:mun')
    async getPDFContractWorkerMun(@Param('mun') mun : string , @Res() res){
        const buffer = await this.contractService.getPDFContractWorkerMun(mun);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=ContractsWorker.pdf');
        res.setHeader('Content-Length', buffer.length);
 
        res.send(buffer);
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

    @Get('/:id')
    async getContractByCliente(@Param('id') id:string){
        return await this.contractService.getCotnractByCliente(id);
    }

    @Delete('/:matricula')
    deleteContract(@Param("matricula") matricula : string){
        this.contractService.deleteContract(matricula);
    }

    @Post()
    createContract(@Body() contract : ContractDto){
        this.contractService.createContract(contract);
        
    }
    @Patch('/:matricula')
    updateContract(@Param("matricula") matricula : string, @Body() contract : ContractDto){
        this.contractService.updateContract(contract, matricula);
    }
}
