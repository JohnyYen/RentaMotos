import { IsString } from "class-validator";

export class FormaPagoDto {
    @IsString()
    public formaPago : string;
}