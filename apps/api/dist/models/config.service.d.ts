import { ConfigService } from '@nestjs/config';
export declare class ConfigServicePg {
    private readonly configService;
    constructor(configService: ConfigService);
    getPassword(): any;
}
