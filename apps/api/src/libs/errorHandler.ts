import { BadRequestException } from "@nestjs/common";

export class ErrorHandler {
    constructor (private readonly error : any) {}

    public returnError() : Error{
        const code = this.error.code;
        if(code === '23505')
            return new BadRequestException('Ya este Usuario existe, revise los datos por favor');
        
    }
}