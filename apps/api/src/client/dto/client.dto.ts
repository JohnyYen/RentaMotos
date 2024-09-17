import { IsNumber, IsString } from "class-validator";

export class ClientDto{

    @IsString()
    public idCliente : string;

    @IsString()
    public nombre : string;

    @IsString()
    public segNombre : string;

    @IsString()
    public primApellido : string;

    @IsString()
    public segApellido : string;

    @IsNumber()
    public edad : number;

    @IsString()
    public municipio : string;

    @IsString()
    public sexo : string;

    public numCont : string;
}