import { MotorcycleDto } from './dto/motorcycle.dto';
import { MarcDto } from './dto/marc.dto';
import { ModelDto } from './dto/model.dto';
export declare class MotorcycleService {
    private conn;
    constructor(conn: any);
    getAllMotorcycle(): Promise<any>;
    getMotoClient(): Promise<any>;
    getPDF(): Promise<Buffer>;
    getSituation(): Promise<any>;
    getPDFSituation(): Promise<Buffer>;
    deleteMotorcycle(id: string): Promise<void>;
    getMarc(): Promise<any>;
    deleteMarc(marc: string): Promise<void>;
    createMarc(nommarca: MarcDto): Promise<void>;
    updateMarc(marc: MarcDto, id: string): Promise<void>;
    createMotorcycle(moto: MotorcycleDto): Promise<void>;
    updateMotorcycle(moto: MotorcycleDto, id: string): Promise<void>;
    getSituationMoto(): Promise<any>;
    getModels(): Promise<any>;
    deleteModels(nomModelo: string): Promise<void>;
    createModels(model: ModelDto): Promise<void>;
    updateModel(model: ModelDto, nomModel: string): Promise<void>;
}
