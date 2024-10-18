import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Res } from '@nestjs/common';
import { MotorcycleService } from './motorcycle.service';
import { MotorcycleDto } from './dto/motorcycle.dto';
import { Response } from 'express';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { MarcDto } from './dto/marc.dto';
import { ModelDto } from './dto/model.dto';

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
        this.motoService.updateMotorcycle(update, id);
    }

    @ApiOperation({summary: "Devuelve todas las situaciones de las motos"})
    @Get()
    async getSituation(){
        return await this.motoService.getSituation();
    }

    @ApiOperation({summary: "Devuelve todas las marcas de las motos"})
    @Get()
    getAllMarc() {
        return this.motoService.getMarc();
    }

    @ApiParam({name: 'id', description: "Identificador de la marca", example: 1})
    @ApiOperation({summary: "Elimina una moto según su ID"})
    @Delete('/:id')
    deleteMarc(@Param('id') id : string){
        this.motoService.deleteMarc(id);
    }

    @ApiOperation({summary: "Crea una nueva marca de moto"})
    @Post()
    createMarc(@Body() marc : MarcDto) {
        this.motoService.createMarc(marc);
    }

    @ApiParam({name: "id", description: "Es el identificador de la marca", example: 1})
    @ApiOperation({summary: "Modifica una marca de moto"})
    @Patch('/:id')
    updateMarc(@Param('id') id : string, @Body() body : MarcDto){
        this.motoService.updateMarc(body , id);
    }

    @ApiOperation({summary: "Devuelve todos los modelos de las motos"})
    @Get()
    getAllModels() {
        return this.motoService.getModels();
    }

    @ApiParam({name:'id', description:"Identificador del modelo"})
    @ApiOperation({summary: "Elimina un modelo de moto dado su identificador"})
    @Delete('/:id')
    deleteModel(@Param('id') id : string){
        this.motoService.deleteModels(id);
    }

    @ApiOperation({summary: "Crea un nuevo modelo"})
    @Post()
    createModel(@Body() model : ModelDto) {
        this.motoService.createModels(model);
    }

    @ApiParam({name:"id", description: "Identificador del modelo"})
    @ApiOperation({summary: "Modifica un modelo dado su identificador"})
    @Patch('/:id')
    updateModel(@Param('id') id : string, @Body() body : ModelDto){
        this.motoService.updateModel(body, id);
    }
}
