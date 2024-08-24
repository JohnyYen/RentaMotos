import { IsString } from "class-validator";

export class MarcDto{
    @IsString()
    public nommarca : string;
}