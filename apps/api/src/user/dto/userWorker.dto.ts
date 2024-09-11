import { IsString, IsStrongPassword } from "class-validator";

export class UserWorkerDto {

    @IsString()
    public user_name : string;

    public password : string;

    public mun : string;

}