import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractDto } from '../forma-pago/dto/contract.dto';
import { ErrorHandler } from 'src/libs/errorHandler';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Contratos')
@Controller('api/contract')
export class ContractController {
    constructor(private readonly contractService : ContractService){}

    
    @ApiOperation({summary: "Devuelve todos los contratos"})
    @Get()
    async getContract(){
        return await this.contractService.getAllContract();
    }

    @ApiOperation({summary: "Devuelve todos los contratos en formato pdf"})
    @Get("/pdf")
    async getContractInPDF(@Res() res){
        const buffer = await this.contractService.getPDFContract();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Contracts.pdf');
        res.setHeader('Content-Length', buffer.length);
 
        res.send(buffer);
    }

    @ApiOperation({summary: "Devuelve todos los contratos en un municipio"})
    @Get('/worker/:mun')
    async getContractsMunWorker(@Param('mun') mun : string){
        return await this.contractService.getContractMun(mun);
    }

    @ApiOperation({summary: "Devuelve todos los contratos en un municipio en formato pdf"})
    @Get('/worker/pdf/:mun')
    async getPDFContractWorkerMun(@Param('mun') mun : string , @Res() res){
        const buffer = await this.contractService.getPDFContractWorkerMun(mun);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=ContractsWorker.pdf');
        res.setHeader('Content-Length', buffer.length);
 
        res.send(buffer);
    }


    
    @ApiOperation({summary: "Devuelve todos los contratos según los municipios"})
    @Get('/mun')
    async getContractByMun(){
        return await this.contractService.getContractByMun();
    }

    @ApiOperation({summary: "Devuelve todos los contratos según los municipios en formato pdf"})
    @Get("/mun/pdf")
    async getContractInPDFMun(@Res() res){
        const buffer = await this.contractService.getPDFContractByMun();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=ContractsByMun.pdf');
        res.setHeader('Content-Length', buffer.length);
 
        res.send(buffer);
    }
    
    @ApiOperation({summary: "Devuelve todos los contratos según la marca y el modelo"})
    @Get('/marcxmodel')
    async getFilterContract(){
        return await this.contractService.getContractFilter();
    }

    @ApiOperation({summary: "Devuelve todos los contratos según la marca y el modelo en formato pdf"})
    @Get("/marcxmodel/pdf")
    async getContractInPDFMarc(@Res() res){
        const buffer = await this.contractService.getPDFContractXModelo();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=ContractsXModeloXMarca.pdf');
        res.setHeader('Content-Length', buffer.length);
 
        res.send(buffer);
    }

    @ApiOperation({summary: "Devuelve todos los contratos de un determinado cliente"})
    @Get('/:id')
    async getContractByCliente(@Param('id') id:string){
        return await this.contractService.getCotnractByCliente(id);
    }

    @ApiOperation({summary: "Elimina a un contrato según la matricula de la moto que está en renta"})
    @Delete('/:matricula')
    deleteContract(@Param("matricula") matricula : string){
        this.contractService.deleteContract(matricula);
    }

    @ApiOperation({summary: "Crea un nuevo contrato"})
    @Post()
    createContract(@Body() contract : ContractDto){
        this.contractService.createContract(contract);
        
    }

    @ApiOperation({summary: "Modifica un contrato según la matricula de la moto que está en renta"})
    @Patch('/:matricula')
    updateContract(@Param("matricula") matricula : string, @Body() contract : ContractDto){
        this.contractService.updateContract(contract, matricula);
    }
}
