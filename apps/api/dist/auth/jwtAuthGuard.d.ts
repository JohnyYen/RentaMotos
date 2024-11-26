import { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
declare const JwtAuthGuard_base: any;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): any;
}
export {};
