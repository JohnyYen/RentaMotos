import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class MarcDto{
    @ApiProperty({type:String, description:"La marca de la moto", example: 'Honda'})
    @IsString()
    public nomMarca : string;
}