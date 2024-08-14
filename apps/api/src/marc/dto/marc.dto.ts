import { IsString } from "class-validator";

export class MarcDto{
    @IsString()
    public name : string;
}