import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class ClientDto{

    @ApiProperty({type:String, description:"Identificador del cliente", example: '03121067683'})
    @IsString()
    public idCliente : string;

    @ApiProperty({type:String, description:"Primer Nombre del cliente", example: 'Johny'})
    @IsString()
    public nombre : string;

    @ApiProperty({type:String, description:"Segundo Nombre del cliente", example: 'Antonio'})
    @IsString()
    public segNombre : string;

    @ApiProperty({type:String, description:"Primer Apellido del cliente", example: 'Pedraza'})
    @IsString()
    public primApellido : string;

    @ApiProperty({type:String, description:"Segundo Apellido del cliente", example: 'Romero'})
    @IsString()
    public segApellido : string;

    @ApiProperty({type:Number, description:"Edad del cliente", example: 21})
    @IsNumber()
    public edad : number;

    @ApiProperty({type:String, description:"Municipio del cliente", example: 'Centro Habana'})
    @IsString()
    public municipio : string;

    @ApiProperty({type:String, description:"Sexo del cliente", example: 'M'})
    @IsString()
    public sexo : string;

    @ApiProperty({type:String, description:"Número de Contacto del cliente", example: '55002026'})
    public numCont : string;
}