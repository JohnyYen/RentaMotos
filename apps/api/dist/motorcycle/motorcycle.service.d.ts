import { MotorcycleDto } from './dto/motorcycle.dto';
import { MotorcyclePatchDto } from './dto/motorcyclePatch.dto';
export declare class MotorcycleService {
    private conn;
    constructor(conn: any);
    getAllMotorcycle(): Promise<any>;
    deleteMotorcycle(id: string): Promise<void>;
    createMotorcycle(moto: MotorcycleDto): Promise<void>;
    updateMotorcycle(moto: MotorcyclePatchDto, id: string): Promise<void>;
}
