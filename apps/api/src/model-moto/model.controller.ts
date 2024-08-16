import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelDto } from './dto/model.dto';

@Controller('api/model')
export class ModelController {
    constructor(private readonly modelService : ModelService){}

    @Get()
    getAllModels() {
        return this.modelService.getModels();
    }

    @Delete('/:id')
    deleteModel(@Param('id') id : string){
        this.modelService.deleteModels(id);
    }

    @Post()
    createModel(@Body() model : ModelDto) {
        this.modelService.createModels(model);
    }

    @Patch('/:id')
    updateModel(@Param('id') id : string, @Body() body : ModelDto){
        this.modelService.updateModel(body, id);
    }
}
