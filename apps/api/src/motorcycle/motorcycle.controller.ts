import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { MotorcycleService } from './motorcycle.service';
import { MotorcycleDto } from './dto/motorcycle.dto';
import { MotorcyclePatchDto } from './dto/motorcyclePatch.dto';

@Controller('api/motorcycle')
export class MotorcycleController {
    constructor (private readonly motoService : MotorcycleService){}

    @Get()
    getAllMoto(){
        return this.motoService.getAllMotorcycle();
    }
    @Get('/pdf')
    getAllMotoInPDF(){
        //Aqui va la función para devolver a pdf
    }

    @Post()
    createMoto(@Body() body : MotorcycleDto){
        this.motoService.createMotorcycle(body);
    }

    @Delete()
    deleteMoto(@Body("id") id : string ) {
        this.motoService.deleteMotorcycle(id);
    }

    @Patch()
    updateMoto(@Body("id") id : string, @Body("update") update : MotorcyclePatchDto){
        //Aqui va la llamada a la actualización
    }
}
