import { MotorcycleDto } from './dto/motorcycle.dto';
export declare class MotorcycleService {
    private conn;
    constructor(conn: any);
    getAllMotorcycle(): Promise<any>;
    getPDF(): Promise<Buffer>;
    getPDFSituation(): Promise<Buffer>;
    deleteMotorcycle(id: string): Promise<void>;
    createMotorcycle(moto: MotorcycleDto): Promise<void>;
    updateMotorcycle(moto: MotorcycleDto, id: string): Promise<void>;
    getSituationMoto(): Promise<any>;
}
