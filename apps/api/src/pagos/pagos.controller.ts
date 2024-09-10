import { Controller, Get, Param } from '@nestjs/common';
import { PagosService } from './pagos.service';

@Controller('api/pagos')
export class PagosController {
    constructor(private readonly pagosService : PagosService){}

    @Get()
    async getAllPagos(){
        return await this.pagosService.getAllPagos();
    }

    @Get('/:mun')
    async getAllPagosByMun(@Param('mun') mun:string){
        return await this.pagosService.getAllPagosByMun(mun);
    }
}
