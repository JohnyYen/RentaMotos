import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MarcService } from './marc.service';
import { MarcDto} from './dto/marc.dto';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('api/marc')
export class MarcController {
    constructor(private readonly marcService : MarcService){}

    @ApiOperation({summary: "Devuelve todas las marcas de las motos"})
    @Get()
    getAllMarc() {
        return this.marcService.getMarc();
    }

    @ApiParam({name: 'id', description: "Identificador de la marca", example: 1})
    @ApiOperation({summary: "Elimina una moto según su ID"})
    @Delete('/:id')
    deleteMarc(@Param('id') id : string){
        this.marcService.deleteMarc(id);
    }

    @ApiOperation({summary: "Crea una nueva marca de moto"})
    @Post()
    createMarc(@Body() marc : MarcDto) {
        this.marcService.createMarc(marc);
    }

    @ApiParam({name: "id", description: "Es el identificador de la marca", example: 1})
    @ApiOperation({summary: "Modifica una marca de moto"})
    @Patch('/:id')
    updateMarc(@Param('id') id : string, @Body() body : MarcDto){
        this.marcService.updateMarc(body , id);
    }
}
