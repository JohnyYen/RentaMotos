import { IsInt, IsNumber, IsString, isString, Max, Min } from "class-validator";

export class MotorcycleDto{

    @IsString({message: "The matricula atributes can be a String"})
    public matricula : string;

    @IsString({message: "The color atributes can be a String"})
    public color : string;

    @IsInt({message: "The cantKm atributes can be a Integer"})
    @Max(0, {message: "The cantKm can be zero"})
    @Min(0, {message: "The cantKm can be zero"})
    public cantKm : number;

    @IsString({message: "The marca atributes can be a String"})
    public marca : string;

    @IsString({message: "The modelo atributes can be a String"})
    public modelo : string;

    @IsString({message: "The situacion atributes can be a String"})
    public situacion : string;
}