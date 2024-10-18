import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsInt, IsString, Min, min } from "class-validator";

export class ContractDto {
    
    @ApiProperty({name: "idCliente", description: "Identificador del Cliente", example: '03121067683', type: String})
    @IsString()
    public idCliente : string;

    @ApiProperty({name: "matricula", description: "Matricula de la Moto", example: 'LH031210', type: String})
    @IsString()
    public matricula : string;

    @ApiProperty({name: "beginDate", description: "Fecha de Inicio del Contrato", example: '24/12/2024', type: String})
    @IsString()
    public beginDate : string;

    @ApiProperty({name: "endDate", description: "Fecha de Fin del Contrato", example: '24/01/2025', type: String})
    @IsString()
    public endDate : string;

    @ApiProperty({name: "firmaDate", description: "Fecha de Firma del Contrato", example: '23/12/2024', type: String})
    @IsString()
    public firmaDate : string;

    @ApiProperty({name: "formaPago", description: "Forma de Pago el Contrato", example: 'Cheque', type:String})
    @IsString()
    public formaPago : string;

    @ApiProperty({name: "seguro", description: "Si el contrato tiene seguro o no", example: false, type:Boolean})
    @IsBoolean()
    public seguro : boolean;

    @ApiProperty({name: "diasProrroga", description: "Los dias de prorroga que tenga el contrato", example: 10, type:Number})
    @IsInt()
    @Min(0)
    public diasProrroga : number;
}