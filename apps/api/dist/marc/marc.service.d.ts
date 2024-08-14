import { MarcDto } from './dto/marc.dto';
export declare class MarcService {
    private conn;
    constructor(conn: any);
    getMarc(): Promise<any>;
    deleteMarc(marc: string): Promise<void>;
    createMarc(marc: MarcDto): Promise<void>;
}
