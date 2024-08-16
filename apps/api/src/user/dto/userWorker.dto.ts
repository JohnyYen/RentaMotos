import { IsString, IsStrongPassword } from "class-validator";

export class UserWorkerDto {

    @IsString()
    public name_user : string;

    @IsStrongPassword()
    public password : string;
}