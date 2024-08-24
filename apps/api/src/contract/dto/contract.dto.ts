import { IsBoolean, IsDate, IsInt, IsString, Min, min } from "class-validator";

export class ContractDto {
    @IsString()
    public idCliente : string;

    @IsString()
    public matricula : string;

    @IsDate()
    public beginDate : Date;

    @IsDate()
    public endDate : Date;

    @IsDate()
    public firmaDate : Date;

    @IsString()
    public formaPago : string;

    @IsBoolean()
    public seguro : boolean;

    @IsInt()
    @Min(0)
    public diasProrroga : number;
}