import { ModelService } from './model.service';
import { ModelDto } from './dto/model.dto';
export declare class ModelController {
    private readonly modelService;
    constructor(modelService: ModelService);
    getAllModels(): Promise<any>;
    deleteModel(id: string): void;
    createModel(model: ModelDto): void;
    updateModel(id: string, body: ModelDto): void;
}
