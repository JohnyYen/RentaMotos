import { Controller, Get } from '@nestjs/common';
import { MunService } from './mun.service';

@Controller('api/mun')
export class MunController {
    constructor(private readonly munService : MunService){}

    @Get()
    async getAllMun(){
        return await this.munService.getAllMun();
    }
}
