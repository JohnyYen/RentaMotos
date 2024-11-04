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
    getAllModels(): Promise<any>;
    getSituation(): Promise<any>;
    createMoto(body: MotorcycleDto): void;
    createMarc(marc: MarcDto): void;
    createModel(model: ModelDto): void;
    updateMoto(id: string, update: MotorcycleDto): void;
    updateModel(id: string, body: ModelDto): void;
    updateMarc(id: string, body: MarcDto): void;
    deleteModel(id: string): void;
    deleteMarc(id: string): void;
    deleteMoto(id: string): void;
}
