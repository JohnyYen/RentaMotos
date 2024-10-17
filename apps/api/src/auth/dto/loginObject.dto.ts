import { PartialType } from "@nestjs/swagger";
import { SignObjectDto } from "./signObject.dto";

export class LoginObjectDto extends PartialType(SignObjectDto){
    name: string;
}