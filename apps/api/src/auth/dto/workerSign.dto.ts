import { IsString } from "class-validator";
import { User } from "./userObject.dto";
import { ApiProperty } from "@nestjs/swagger";

export class WorkerSignDto extends User{

    @ApiProperty({type:String, description: 'El municipio el cual es encargado el trabajador'})
    @IsString()
    mun:string
}