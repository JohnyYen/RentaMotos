import { MarcService } from './marc.service';
import { MarcDto } from './dto/marc.dto';
export declare class MarcController {
    private readonly marcService;
    constructor(marcService: MarcService);
    getAllMarc(): Promise<any>;
    deleteMarc(marc: string): void;
    createMarc(marc: MarcDto): void;
}
