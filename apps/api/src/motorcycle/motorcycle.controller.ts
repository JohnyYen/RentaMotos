import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { MotorcycleService } from './motorcycle.service';
import { MotorcycleDto } from './dto/motorcycle.dto';
import { Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { MarcDto } from './dto/marc.dto';
import { ModelDto } from './dto/model.dto';
import { JwtAuthGuard } from 'src/auth/jwtAuthGuard';

@ApiBearerAuth()
@ApiTags('Motocicletas')
@Controller('api/moto')
export class MotorcycleController {
    constructor (private readonly motoService : MotorcycleService){}

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: "Devuelve todas las motos"})
    @Get()
    @HttpCode(200)
    getAllMoto(){
        return this.motoService.getAllMotorcycle();
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: "Devuelve todas las motos en formato pdf"})
    @Get('/pdf')
    async getAllMotoInPDF(@Res() res: Response):Promise<void>{
       const buffer = await this.motoService.getPDF();

       res.setHeader('Content-Type', 'application/pdf');
       res.setHeader('Content-Disposition', 'attachment; filename=ReporteMoto.pdf');
       res.setHeader('Content-Length', buffer.length);

       res.send(buffer);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary:"Devuelve todas las motos que esten disponible"})
    @Get('/client')
    async getMotoClient(){
        return await this.motoService.getMotoClient();
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: "Devuelve la situación de las motos"})
    @Get('/situation')
    getSituationMoto(){
        return this.motoService.getSituationMoto();
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: "Devuelve la situación de las motos en formato pdf"})
    @Get('/situation/pdf')
    async getPDFSituation(@Res() res){
        const buffer = await this.motoService.getPDFSituation();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=SituacionMoto.pdf');
        res.setHeader('Content-Length', buffer.length);
 
        res.send(buffer);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: "Devuelve todos los modelos de las motos"})
    @Get('/model')
    async getAllModels() {
        return await this.motoService.getModels();
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: "Devuelve todas las situaciones posibles para las motos"})
    @Get('/situacion')
    async getSituation(){
        return await this.motoService.getSituation();
    }

    @UseGuards(JwtAuthGuard)
    @ApiBody({type:MotorcycleDto, description: "Los datos de la moto"})
    @ApiOperation({summary: "Crea una moto"})
    @Post()
    async createMoto(@Body() body : MotorcycleDto){
        return await this.motoService.createMotorcycle(body);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBody({type:MarcDto, description: "Los datos de la marca"})
    @ApiOperation({summary: "Crea una nueva marca de moto"})
    @Post('/marca')
    async createMarc(@Body() marc : MarcDto) {
        // try {
            return await this.motoService.createMarc(marc);
        // } catch (error) {
        //     throw error;
        // }
    }

    @UseGuards(JwtAuthGuard)
    @ApiBody({type:ModelDto, description:"Los datos para crear una nueva moto"})
    @ApiOperation({summary: "Crea un nuevo modelo"})
    @Post('/model')
    async createModel(@Body() model : ModelDto) {
        return await this.motoService.createModels(model);
    }

    @UseGuards(JwtAuthGuard)
    @ApiParam({name:"id", description: "La matricula de la moto"})
    @ApiBody({type:MotorcycleDto, description: "Los datos de las motos"})
    @ApiOperation({summary: "Modifica una moto según su id"})
    @Patch('/:id')
    async updateMoto(@Param("id") id : string, @Body() update : MotorcycleDto){
        return await this.motoService.updateMotorcycle(update, id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBody({type: ModelDto, description: "Los datos del modelo"})
    @ApiParam({name:"id", description: "Identificador del modelo"})
    @ApiOperation({summary: "Modifica un modelo dado su identificador"})
    @Patch('/model/:id')
    async updateModel(@Param('id') id : string, @Body() body : ModelDto){
        return await this.motoService.updateModel(body, +id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBody({type: MarcDto, description: "Los datos de la Marca"})
    @ApiParam({name: "id", description: "Es el identificador de la marca", example: 1})
    @ApiOperation({summary: "Modifica una marca de moto"})
    @Patch('/marc/:id')
    async updateMarc(@Param('id') id : string, @Body() body : MarcDto){
        return await this.motoService.updateMarc(body , +id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiParam({name:"id", description:"Matricula de la Moto"})
    @ApiOperation({summary: "Elimina una moto según su id"})
    @Delete('/:id')
    async deleteMoto(@Param("id") id : string ) {
        return await this.motoService.deleteMotorcycle(+id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiParam({name:'id', description:"Identificador del modelo"})
    @ApiOperation({summary: "Elimina un modelo de moto dado su identificador"})
    @Delete('/model/:id')
    async deleteModel(@Param('id') id : string){
        return await this.motoService.deleteModels(+id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiParam({name: 'id', description: "Identificador de la marca", example: 1})
    @ApiOperation({summary: "Elimina una moto según su ID"})
    @Delete('/marc/:id')
    async deleteMarc(@Param('id') id : string){
        return await this.motoService.deleteMarc(+id);
    }

}
