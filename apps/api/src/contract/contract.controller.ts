import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractDto } from './dto/contract.dto';
import { ErrorHandler } from 'src/libs/errorHandler';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { FormaPagoDto } from './dto/formaPago.dto';
import { JwtAuthGuard } from 'src/auth/jwtAuthGuard';
import { SkipAuth } from 'src/auth/public.decorator';
import { RoleGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@ApiBearerAuth()
@ApiTags('Contratos')
@Controller('api/contract')
export class ContractController {
    constructor(private readonly contractService : ContractService){}

    @SkipAuth()
    @ApiOperation({summary: "Devuelve todas las formas de pago en la aplicación"})
    @Get('/formasPago')
    async getAllFormaPago(){
        return await this.contractService.getAllFormaPago();
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.Admin, Role.Worker, Role.User)
    @ApiOperation({summary: "Devuelve todos los contratos"})
    @Get()
    async getContract(){
        return await this.contractService.getAllContract();
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.Admin, Role.Worker)
    @ApiOperation({summary: "Devuelve todos los contratos en formato pdf"})
    @Get("/pdf")
    async getContractInPDF(@Res() res){
        const buffer = await this.contractService.getPDFContract();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Contracts.pdf');
        res.setHeader('Content-Length', buffer.length);
 
        res.send(buffer);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.Admin, Role.Worker)
    @ApiOperation({summary: "Devuelve todos los contratos en un municipio"})
    @Get('/worker/:mun')
    async getContractsMunWorker(@Param('mun') mun : string){
        return await this.contractService.getContractMun(mun);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.Admin, Role.Worker)
    @ApiOperation({summary: "Devuelve todos los contratos en un municipio en formato pdf"})
    @Get('/worker/pdf/:mun')
    async getPDFContractWorkerMun(@Param('mun') mun : string , @Res() res){
        const buffer = await this.contractService.getPDFContractWorkerMun(mun);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=ContractsWorker.pdf');
        res.setHeader('Content-Length', buffer.length);
 
        res.send(buffer);
    }


    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiOperation({summary: "Devuelve todos los contratos según los municipios"})
    @Roles(Role.Admin, Role.Worker)
    @Get('/mun')
    async getContractByMun(){
        return await this.contractService.getContractByMun();
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.Admin, Role.Worker)
    @ApiOperation({summary: "Devuelve todos los contratos según los municipios en formato pdf"})
    @Get("/mun/pdf")
    async getContractInPDFMun(@Res() res){
        const buffer = await this.contractService.getPDFContractByMun();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=ContractsByMun.pdf');
        res.setHeader('Content-Length', buffer.length);
 
        res.send(buffer);
    }

    
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.Admin, Role.Worker)
    @ApiOperation({summary: "Devuelve todos los contratos según la marca y el modelo"})
    @Get('/marcxmodel')
    async getFilterContract(){
        return await this.contractService.getContractFilter();
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.Admin, Role.Worker)
    @ApiOperation({summary: "Devuelve todos los contratos según la marca y el modelo en formato pdf"})
    @Get("/marcxmodel/pdf")
    async getContractInPDFMarc(@Res() res){
        const buffer = await this.contractService.getPDFContractXModelo();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=ContractsXModeloXMarca.pdf');
        res.setHeader('Content-Length', buffer.length);
 
        res.send(buffer);
    }
  
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.Admin, Role.Worker)
    @ApiOperation({summary: "Devuelve todos los cobros realizados"})
    @Get('/cobros')
    async getAllPagos(){
        return await this.contractService.getAllPagos();
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.Admin, Role.Worker)
    @ApiOperation({summary: "Devuelve todos los cobros realizados en formato pdf"})
    @Get('/cobros/pdf')
    async getAllPagosPDF(@Res() res){
        const buffer = await this.contractService.getAllPagosPDF();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Importe.pdf');
        res.setHeader('Content-Length', buffer.length);
 
        res.send(buffer);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.Admin, Role.Worker)
    @ApiOperation({summary: "Devuelve todos los cobros de un municipio en formato pdf"})
    @Get('/cobros/worker/pdf/:mun')
    async getAllPagosPDFMun(@Res() res, @Param('mun') mun : string){
        const buffer = await this.contractService.getAllPagosByPDF(mun);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Importe.pdf');
        res.setHeader('Content-Length', buffer.length);
 
        res.send(buffer);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.Admin, Role.Worker)
    @ApiOperation({summary: "Devuelve todos los cobros de un municipio"})
    @Get('/cobros/:mun')
    async getAllPagosByMun(@Param('mun') mun:string){
        return await this.contractService.getAllPagosByMun(mun);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.Admin, Role.Worker, Role.User)
    @ApiOperation({summary: "Devuelve todos los contratos de un determinado cliente"})
    @Get('/:id')
    async getContractByCliente(@Param('id') id:string){
        return await this.contractService.getCotnractByCliente(id);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.Admin, Role.Worker, Role.User)
    @ApiOperation({summary: "Crea un nuevo contrato"})
    @Post()
    async createContract(@Body() contract : ContractDto){
        return await this.contractService.createContract(contract);    
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.Admin)
    @ApiOperation({summary: "Permite crear nuevas formas de pagos"})
    @Post('/formasPago')
    async createFormaPago(@Body() form : FormaPagoDto){
        return await this.contractService.createFormaPago(form);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.Admin, Role.Worker)
    @ApiOperation({summary: "Modifica un contrato según la matricula de la moto que está en renta"})
    @Patch('/:matricula')
    async updateContract(@Param("matricula") matricula : string, @Body() contract : ContractDto){
        return await this.contractService.updateContract(contract, matricula);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.Admin)
    @ApiParam({name:'id', description:"Identificador de la forma de pago", example: 1})
    @ApiOperation({summary: "Modifica una forma de pago según su id"})
    @Patch('/formasPago/:id')
    async updateFormaPago(@Body() body : FormaPagoDto, @Param('id') id : string){
        return await this.contractService.updateFormaPago(body, id);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.Admin)
    @ApiParam({name: "id", description: "Identificador de la forma de pago", example: 1, type: Number})
    @ApiOperation({summary: "Elimina una forma de pago"})
    @Delete("/formasPago/:id")
    async deleteFormaPago(@Param('id') id : string){
        return await this.contractService.deleteFormaPago(id);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.Admin, Role.Worker)
    @ApiOperation({summary: "Elimina a un contrato según la matricula de la moto que está en renta"})
    @Delete('/:matricula')
    async deleteContract(@Param("matricula") matricula : string){
        return await this.contractService.deleteContract(matricula);
    }
}
