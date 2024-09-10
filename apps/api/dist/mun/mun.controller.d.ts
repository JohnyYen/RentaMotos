import { MunService } from './mun.service';
export declare class MunController {
    private readonly munService;
    constructor(munService: MunService);
    getAllMun(): Promise<any>;
}
