import { IsString, IsStrongPassword } from "class-validator";

export class UserWorkerDto {

    @IsString()
    public user_name : string;

    @IsStrongPassword()
    public password : string;
}