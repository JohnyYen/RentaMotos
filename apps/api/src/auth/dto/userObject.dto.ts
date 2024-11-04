import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class User{
    @ApiProperty({type:String, description: "Contraseña del usuario", example: "asdASD123"})
    //@IsStrongPassword()
    password: string;

    @ApiProperty({type:String, description: "Nombre de usuario", example: "johnyYen"})
    @IsString()
    user_name:string;

    @ApiProperty({type:String, description:"Correo Electrónico del Usuario", example: "jhonnyantonio892@gmail.com"})
    @IsEmail()
    email: string;
}