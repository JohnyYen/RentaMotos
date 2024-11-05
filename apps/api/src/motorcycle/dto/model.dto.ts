import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ModelDto{
    @ApiProperty({type:String, description: "Marca de la moto", example: "Honda"})
    @IsString()  
    public nomMarca : string;

    @ApiProperty({type:String, description: "Modelo de la moto", example: "Gold Wing"})
    @IsString()
    public nomModelo : string;
}