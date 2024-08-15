import { IsString } from "class-validator";

export class ModelDto{
    @IsString()  
    public nomMarca : string;

    @IsString()
    public nomModelo : string;
}