import { Controller, Get } from '@nestjs/common';
import { SituationService } from './situation.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('api/situation')
export class SituationController {
    constructor(private readonly service : SituationService){};

    @ApiOperation({summary: "Devuelve todas las situaciones de las motos"})
    @Get()
    async getSituation(){
        return await this.service.getSituation();
    }
}
