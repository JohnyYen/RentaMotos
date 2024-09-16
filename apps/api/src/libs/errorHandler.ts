import { BadRequestException } from "@nestjs/common";

export class ErrorHandler {
    constructor (private readonly error : any) {}

    public returnError() : Error{
        const code = this.error.code;
        console.log(code);
        console.log(this.error.message);
        let message = this.error.message;
        if(code === '23505')
            message = 'Ya este Usuario existe, revise los datos por favor';
        
        return new BadRequestException(message);

        
    }
}