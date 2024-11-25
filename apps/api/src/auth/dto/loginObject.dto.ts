import { OmitType, PartialType } from "@nestjs/swagger";
import { SignObjectDto } from "./signObject.dto";
import { User } from "./userObject.dto";

export class LoginObjectDto extends PartialType(User){
}