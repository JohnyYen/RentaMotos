import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { MarcService } from './marc.service';
import { MarcDto} from './dto/marc.dto';

@Controller('api/marc')
export class MarcController {
    constructor(private readonly marcService : MarcService){}

    @Get()
    getAllMarc() {
        return this.marcService.getMarc();
    }

    @Delete()
    deleteMarc(@Body('marc') marc : string){
        this.marcService.deleteMarc(marc);
    }

    @Post()
    createMarc(@Body('marc') marc : MarcDto) {
        this.marcService.createMarc(marc);
    }
}
