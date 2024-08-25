import { MotorcycleService } from './motorcycle.service';
import { MotorcycleDto } from './dto/motorcycle.dto';
import { MotorcyclePatchDto } from './dto/motorcyclePatch.dto';
import { Response } from 'express';
export declare class MotorcycleController {
    private readonly motoService;
    constructor(motoService: MotorcycleService);
    getAllMoto(): Promise<any>;
    getAllMotoInPDF(res: Response): Promise<void>;
    getSituationMoto(): Promise<any>;
    getPDFSituation(res: any): Promise<void>;
    createMoto(body: MotorcycleDto): void;
    deleteMoto(id: string): void;
    updateMoto(id: string, update: MotorcyclePatchDto): void;
}
