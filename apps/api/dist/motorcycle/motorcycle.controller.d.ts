import { MotorcycleService } from './motorcycle.service';
import { MotorcycleDto } from './dto/motorcycle.dto';
import { MotorcyclePatchDto } from './dto/motorcyclePatch.dto';
export declare class MotorcycleController {
    private readonly motoService;
    constructor(motoService: MotorcycleService);
    getAllMoto(): Promise<any>;
    getAllMotoInPDF(): void;
    getSituationMoto(): Promise<any>;
    createMoto(body: MotorcycleDto): void;
    deleteMoto(id: string): void;
    updateMoto(id: string, update: MotorcyclePatchDto): void;
}
