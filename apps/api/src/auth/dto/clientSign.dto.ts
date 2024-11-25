import { ApiProperty } from "@nestjs/swagger";
import { User } from "./userObject.dto";
import { IsEmail, IsString } from "class-validator";

export class ClientSignDto extends User{
  
    // @ApiProperty({type:String, description: "Carnet de Identidad del Usuario"})
    // @IsString()
    // ci?:string
}