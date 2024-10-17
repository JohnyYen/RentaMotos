import { IsEmail, isEmail, IsString } from "class-validator";

export class SignObjectDto {
    @IsEmail()
    email: string;

    password: string;

}