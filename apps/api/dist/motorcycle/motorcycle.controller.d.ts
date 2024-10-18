import { MotorcycleService } from './motorcycle.service';
import { MotorcycleDto } from './dto/motorcycle.dto';
import { Response } from 'express';
import { MarcDto } from './dto/marc.dto';
import { ModelDto } from './dto/model.dto';
export declare class MotorcycleController {
    private readonly motoService;
    constructor(motoService: MotorcycleService);
    getAllMoto(): Promise<any>;
    getAllMotoInPDF(res: Response): Promise<void>;
    getMotoClient(): Promise<any>;
    getSituationMoto(): Promise<any>;
    getPDFSituation(res: any): Promise<void>;
    createMoto(body: MotorcycleDto): void;
    deleteMoto(id: string): void;
    updateMoto(id: string, update: MotorcycleDto): void;
    getSituation(): Promise<any>;
    getAllMarc(): Promise<any>;
    deleteMarc(id: string): void;
    createMarc(marc: MarcDto): void;
    updateMarc(id: string, body: MarcDto): void;
    getAllModels(): Promise<any>;
    deleteModel(id: string): void;
    createModel(model: ModelDto): void;
    updateModel(id: string, body: ModelDto): void;
}
