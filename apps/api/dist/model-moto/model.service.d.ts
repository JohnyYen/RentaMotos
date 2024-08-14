import { ModelDto } from './dto/model.dto';
export declare class ModelService {
    private conn;
    constructor(conn: any);
    getModels(): Promise<any>;
    deleteModels(nomModelo: string): Promise<void>;
    createModels(model: ModelDto): Promise<void>;
}
