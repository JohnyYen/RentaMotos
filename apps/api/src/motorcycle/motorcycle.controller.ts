import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Res } from '@nestjs/common';
import { MotorcycleService } from './motorcycle.service';
import { MotorcycleDto } from './dto/motorcycle.dto';
import { Response } from 'express';

@Controller('api/moto')
export class MotorcycleController {
    constructor (private readonly motoService : MotorcycleService){}
    @Get()
    @HttpCode(200)
    getAllMoto(){
        return this.motoService.getAllMotorcycle();
    }
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
    @Get('/situation')
    getSituationMoto(){
        return this.motoService.getSituationMoto();
    }

    @Get('/situation/pdf')
    async getPDFSituation(@Res() res){
        const buffer = await this.motoService.getPDFSituation();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=SituacionMoto.pdf');
        res.setHeader('Content-Length', buffer.length);
 
        res.send(buffer);
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
    updateMoto(@Param("id") id : string, @Body() update : MotorcycleDto){
        //console.log(id);
        this.motoService.updateMotorcycle(update, id);
    }
}
