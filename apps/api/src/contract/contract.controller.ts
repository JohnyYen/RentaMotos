import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractDto } from './dto/contract.dto';
import { ErrorHandler } from 'src/libs/errorHandler';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { FormaPagoDto } from './dto/formaPago.dto';

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


    @ApiOperation({summary: "Devuelve todas las formas de pago en la aplicación"})
    @Get()
    async getAllFormaPago(){
        return await this.contractService.getAllFormaPago();
    }

    @ApiOperation({summary: "Permite crear nuevas formas de pagos"})
    @Post()
    createFormaPago(@Body() form : FormaPagoDto){
        this.contractService.createFormaPago(form);
    }

    @ApiParam({name: "id", description: "Identificador de la forma de pago", example: 1, type: Number})
    @ApiOperation({summary: "Elimina una forma de pago"})
    @Delete("/:id")
    deleteFormaPago(@Param('id') id : string){
        this.contractService.deleteFormaPago(id);
    }

    @ApiParam({name:'id', description:"Identificador de la forma de pago", example: 1})
    @ApiOperation({summary: "Modifica una forma de pago según su id"})
    @Patch('/:id')
    updateFormaPago(@Body() body : FormaPagoDto, @Param('id') id : string){
        this.contractService.updateFormaPago(body, id);
    }

    @ApiOperation({summary: "Devuelve todos los cobros realizados"})
    @Get()
    async getAllPagos(){
        return await this.contractService.getAllPagos();
    }

    @ApiOperation({summary: "Devuelve todos los cobros realizados en formato pdf"})
    @Get('/pdf')
    async getAllPagosPDF(@Res() res){
        const buffer = await this.contractService.getAllPagosPDF();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Importe.pdf');
        res.setHeader('Content-Length', buffer.length);
 
        res.send(buffer);
    }

    @ApiOperation({summary: "Devuelve todos los cobros de un municipio en formato pdf"})
    @Get('/worker/pdf/:mun')
    async getAllPagosPDFMun(@Res() res, @Param('mun') mun : string){
        const buffer = await this.contractService.getAllPagosByPDF(mun);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Importe.pdf');
        res.setHeader('Content-Length', buffer.length);
 
        res.send(buffer);
    }

    @ApiOperation({summary: "Devuelve todos los cobros de un municipio"})
    @Get('/:mun')
    async getAllPagosByMun(@Param('mun') mun:string){
        return await this.contractService.getAllPagosByMun(mun);
    }
}
