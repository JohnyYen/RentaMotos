import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, IsString, Max, Min } from "class-validator";

export class MotorcycleDto{

    @ApiProperty({type:String, description:"La matricula de la moto", example: 'LH031210'})
    @IsString({message: "The matricula atribute can be a String"})
    public matricula : string;

    @ApiProperty({type:String, description:"El color de la moto", example: 'Rojo'})
    @IsString({message: "The color atribute can be a String"})
    public color : string;

    @ApiProperty({type:Number, description:"La cantidad de Km recorridos por la moto", example: 0, minimum:0})
    @IsInt({message: "The cantKm atribute can be a Integer"})
    @Min(0, {message: "The cantKm can be zero"})
    public cantKm : number;

    @ApiProperty({type:String, description:"La marca de la moto", example: 'Honda'})
    @IsString({message: "The marca atribute can be a String"})
    public marca : string;

    @ApiProperty({type:String, description:"El modelo de la moto", example: 'Gold Wing'})
    @IsString({message: "The modelo atribute can be a String"})
    public modelo : string;

    @ApiProperty({type:String, description:"La situacion de la moto", examples: ['Alquilada', 'Taller', 'Disponible']})
    @IsString({message: "The situacion atribute can be a String"})
    public situacion : string;
}