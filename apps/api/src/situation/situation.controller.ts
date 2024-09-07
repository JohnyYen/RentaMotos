import { Controller, Get } from '@nestjs/common';
import { SituationService } from './situation.service';

@Controller('api/situation')
export class SituationController {
    constructor(private readonly service : SituationService){};

    @Get()
    async getSituation(){
        return await this.service.getSituation();
    }
}
