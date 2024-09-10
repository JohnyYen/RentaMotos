import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class UserClientDto {

    @IsString()
    public user_name : string;

    public password : string;

    @IsEmail()
    public email : string;

    @IsString()
    public id : string;
}