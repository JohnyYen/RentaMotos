import { IsInt, IsNumber, IsString, Max, Min } from "class-validator";

export class MotorcycleDto{

    @IsString({message: "The matricula atribute can be a String"})
    public matricula : string;

    @IsString({message: "The color atribute can be a String"})
    public color : string;

    @IsInt({message: "The cantKm atribute can be a Integer"})
    @Min(0, {message: "The cantKm can be zero"})
    public cantKm : number;

    @IsString({message: "The marca atribute can be a String"})
    public marca : string;

    @IsString({message: "The modelo atribute can be a String"})
    public modelo : string;

    @IsString({message: "The situacion atribute can be a String"})
    public situacion : string;
}