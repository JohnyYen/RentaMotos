import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Res } from '@nestjs/common';
import { MotorcycleService } from './motorcycle.service';
import { MotorcycleDto } from './dto/motorcycle.dto';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Motocicletas')
@Controller('api/moto')
export class MotorcycleController {
    constructor (private readonly motoService : MotorcycleService){}

    @ApiOperation({summary: "Devuelve todas las motos"})
    @Get()
    @HttpCode(200)
    getAllMoto(){
        return this.motoService.getAllMotorcycle();
    }

    @ApiOperation({summary: "Devuelve todas las motos en formato pdf"})
    @Get('/pdf')
    async getAllMotoInPDF(@Res() res: Response):Promise<void>{
       const buffer = await this.motoService.getPDF();

       res.setHeader('Content-Type', 'application/pdf');
       res.setHeader('Content-Disposition', 'attachment; filename=ReporteMoto.pdf');
       res.setHeader('Content-Length', buffer.length);

       res.send(buffer);
    }


    @Get('/client')
    async getMotoClient(){
        return await this.motoService.getMotoClient();
    }

    @ApiOperation({summary: "Devuelve la situación de las motos"})
    @Get('/situation')
    getSituationMoto(){
        return this.motoService.getSituationMoto();
    }

    @ApiOperation({summary: "Devuelve la situación de las motos en formato pdf"})
    @Get('/situation/pdf')
    async getPDFSituation(@Res() res){
        const buffer = await this.motoService.getPDFSituation();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=SituacionMoto.pdf');
        res.setHeader('Content-Length', buffer.length);
 
        res.send(buffer);
    }

    @ApiOperation({summary: "Crea una mota"})
    @Post()
    createMoto(@Body() body : MotorcycleDto){
        this.motoService.createMotorcycle(body);
    }

    @ApiOperation({summary: "Elimina una moto según su id"})
    @Delete('/:id')
    deleteMoto(@Param("id") id : string ) {
        this.motoService.deleteMotorcycle(id);
    }

    @ApiOperation({summary: "Modifica una moto según su id"})
    @Patch('/:id')
    updateMoto(@Param("id") id : string, @Body() update : MotorcycleDto){
        //console.log(id);
        this.motoService.updateMotorcycle(update, id);
    }
}
