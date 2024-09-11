import { IsBoolean, IsDate, IsInt, IsString, Min, min } from "class-validator";

export class ContractDto {
    
    @IsString()
    public idCliente : string;

    @IsString()
    public matricula : string;

    @IsString()
    public beginDate : string;

    @IsString()
    public endDate : string;

    @IsString()
    public firmaDate : string;

    @IsString()
    public formaPago : string;

    @IsBoolean()
    public seguro : boolean;

    @IsInt()
    @Min(0)
    public diasProrroga : number;
}