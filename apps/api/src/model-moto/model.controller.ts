import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelDto } from './dto/model.dto';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('api/model')
export class ModelController {
    constructor(private readonly modelService : ModelService){}

    @ApiOperation({summary: "Devuelve todos los modelos de las motos"})
    @Get()
    getAllModels() {
        return this.modelService.getModels();
    }

    @ApiParam({name:'id', description:"Identificador del modelo"})
    @ApiOperation({summary: "Elimina un modelo de moto dado su identificador"})
    @Delete('/:id')
    deleteModel(@Param('id') id : string){
        this.modelService.deleteModels(id);
    }

    @ApiOperation({summary: "Crea un nuevo modelo"})
    @Post()
    createModel(@Body() model : ModelDto) {
        this.modelService.createModels(model);
    }

    @ApiParam({name:"id", description: "Identificador del modelo"})
    @ApiOperation({summary: "Modifica un modelo dado su identificador"})
    @Patch('/:id')
    updateModel(@Param('id') id : string, @Body() body : ModelDto){
        this.modelService.updateModel(body, id);
    }
}
