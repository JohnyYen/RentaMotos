import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { MotorcycleService } from './motorcycle.service';
import { MotorcycleDto } from './dto/motorcycle.dto';
import { MotorcyclePatchDto } from './dto/motorcyclePatch.dto';
import { Response } from 'express';

@Controller('api/moto')
export class MotorcycleController {
    constructor (private readonly motoService : MotorcycleService){}

    @Get()
    getAllMoto(){
        return this.motoService.getAllMotorcycle();
    }
    @Get('/pdf')
    async getAllMotoInPDF(@Res() res: Response){
       await this.motoService.getPDF(res);
    }

    @Get('/situation')
    getSituationMoto(){
        return this.motoService.getSituationMoto();
    }
    @Post()
    createMoto(@Body() body : MotorcycleDto){
        this.motoService.createMotorcycle(body);
    }

    @Delete('/:id')
    deleteMoto(@Param("id") id : string ) {
        this.motoService.deleteMotorcycle(id);
    }

    @Patch('/:id')
    updateMoto(@Param("id") id : string, @Body() update : MotorcyclePatchDto){
        this.motoService.updateMotorcycle(update, id);
    }
}
