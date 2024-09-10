import { SituationService } from './situation.service';
export declare class SituationController {
    private readonly service;
    constructor(service: SituationService);
    getSituation(): Promise<any>;
}
