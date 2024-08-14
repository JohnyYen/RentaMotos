import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ModelService } from './model.service';
import { ModelDto } from './dto/model.dto';

@Controller('api/model')
export class ModelController {
    constructor(private readonly modelService : ModelService){}

    @Get()
    getAllModels() {
        return this.modelService.getModels();
    }

    @Delete()
    deleteModel(@Body('id') id : string){
        this.modelService.deleteModels(id);
    }

    @Post()
    createModel(@Body('model') model : ModelDto) {
        this.modelService.createModels(model);
    }
}
