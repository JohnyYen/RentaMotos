import { Controller, Get, Param, Res } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('api/pagos')
export class PagosController {
    constructor(private readonly pagosService : PagosService){}

    @ApiOperation({summary: "Devuelve todos los cobros realizados"})
    @Get()
    async getAllPagos(){
        return await this.pagosService.getAllPagos();
    }

    @ApiOperation({summary: "Devuelve todos los cobros realizados en formato pdf"})
    @Get('/pdf')
    async getAllPagosPDF(@Res() res){
        const buffer = await this.pagosService.getAllPagosPDF();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Importe.pdf');
        res.setHeader('Content-Length', buffer.length);
 
        res.send(buffer);
    }

    @ApiOperation({summary: "Devuelve todos los cobros de un municipio en formato pdf"})
    @Get('/worker/pdf/:mun')
    async getAllPagosPDFMun(@Res() res, @Param('mun') mun : string){
        const buffer = await this.pagosService.getAllPagosByPDF(mun);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Importe.pdf');
        res.setHeader('Content-Length', buffer.length);
 
        res.send(buffer);
    }

    @ApiOperation({summary: "Devuelve todos los cobros de un municipio"})
    @Get('/:mun')
    async getAllPagosByMun(@Param('mun') mun:string){
        return await this.pagosService.getAllPagosByMun(mun);
    }

}
