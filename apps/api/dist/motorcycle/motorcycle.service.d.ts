import { MotorcycleDto } from './dto/motorcycle.dto';
import { MotorcyclePatchDto } from './dto/motorcyclePatch.dto';
import { Response } from 'express';
export declare class MotorcycleService {
    private conn;
    constructor(conn: any);
    getAllMotorcycle(): Promise<any>;
    getPDF(res: Response): Promise<void>;
    deleteMotorcycle(id: string): Promise<void>;
    createMotorcycle(moto: MotorcycleDto): Promise<void>;
    updateMotorcycle(moto: MotorcyclePatchDto, id: string): Promise<void>;
    getSituationMoto(): Promise<any>;
}
