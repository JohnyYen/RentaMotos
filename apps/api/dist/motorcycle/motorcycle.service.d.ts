import { MotorcycleDto } from './dto/motorcycle.dto';
import { MarcDto } from './dto/marc.dto';
import { ModelDto } from './dto/model.dto';
import { PgService } from 'src/pg/pg.service';
export declare class MotorcycleService {
    private conn;
    private pgService;
    constructor(conn: any, pgService: PgService);
    getAllMotorcycle(): Promise<any>;
    getMotoClient(): Promise<any>;
    getPDF(): Promise<Buffer>;
    getSituation(): Promise<any>;
    getPDFSituation(): Promise<Buffer>;
    deleteMotorcycle(id: string): Promise<void>;
    getMarc(): Promise<any>;
    deleteMarc(marc: number): Promise<void>;
    createMarc(marca: MarcDto): Promise<void>;
    updateMarc(marc: MarcDto, id: number): Promise<void>;
    createMotorcycle(moto: MotorcycleDto): Promise<any>;
    updateMotorcycle(moto: MotorcycleDto, id: string): Promise<void>;
    getSituationMoto(): Promise<any>;
    getModels(): Promise<any>;
    deleteModels(id: number): Promise<void>;
    createModels(model: ModelDto): Promise<void>;
    updateModel(model: ModelDto, id: number): Promise<void>;
}
