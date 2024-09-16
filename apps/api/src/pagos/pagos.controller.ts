import { Controller, Get, Param, Res } from '@nestjs/common';
import { PagosService } from './pagos.service';

@Controller('api/pagos')
export class PagosController {
    constructor(private readonly pagosService : PagosService){}

    @Get()
    async getAllPagos(){
        return await this.pagosService.getAllPagos();
    }

    @Get('/pdf')
    async getAllPagosPDF(@Res() res){
        const buffer = await this.pagosService.getAllPagosPDF();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Importe.pdf');
        res.setHeader('Content-Length', buffer.length);
 
        res.send(buffer);
    }

    @Get('/worker/pdf/:mun')
    async getAllPagosPDFMun(@Res() res, @Param('mun') mun : string){
        const buffer = await this.pagosService.getAllPagosByPDF(mun);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Importe.pdf');
        res.setHeader('Content-Length', buffer.length);
 
        res.send(buffer);
    }

    @Get('/:mun')
    async getAllPagosByMun(@Param('mun') mun:string){
        return await this.pagosService.getAllPagosByMun(mun);
    }

}
