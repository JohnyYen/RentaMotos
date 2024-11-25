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
    createMoto(body: MotorcycleDto): Promise<any>;
    createMarc(marc: MarcDto): Promise<void>;
    createModel(model: ModelDto): Promise<void>;
    updateMoto(id: string, update: MotorcycleDto): Promise<void>;
    updateModel(id: string, body: ModelDto): Promise<void>;
    updateMarc(id: string, body: MarcDto): Promise<void>;
    deleteMoto(id: string): Promise<void>;
    deleteModel(id: string): Promise<void>;
    deleteMarc(id: string): Promise<void>;
}
