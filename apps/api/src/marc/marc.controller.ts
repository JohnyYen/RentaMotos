import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MarcService } from './marc.service';
import { MarcDto} from './dto/marc.dto';

@Controller('api/marc')
export class MarcController {
    constructor(private readonly marcService : MarcService){}

    @Get()
    getAllMarc() {
        return this.marcService.getMarc();
    }

    @Delete('/:id')
    deleteMarc(@Param('id') id : string){
        this.marcService.deleteMarc(id);
    }

    @Post()
    createMarc(@Body() marc : MarcDto) {
        this.marcService.createMarc(marc);
    }

    @Patch('/:id')
    updateMarc(@Param('id') id : string, @Body() body : MarcDto){
        this.marcService.updateMarc(body , id);
    }
}
