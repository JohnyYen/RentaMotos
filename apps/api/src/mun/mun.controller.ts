import { Controller, Get } from '@nestjs/common';
import { MunService } from './mun.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('api/mun')
export class MunController {
    constructor(private readonly munService : MunService){}

    @ApiOperation({summary: "Devuelve todos los municipios"})
    @Get()
    async getAllMun(){
        return await this.munService.getAllMun();
    }
}
