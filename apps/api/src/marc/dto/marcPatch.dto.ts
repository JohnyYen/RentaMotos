import { PartialType } from "@nestjs/mapped-types";
import { MarcDto } from "./marc.dto";

export class marcPatchDto extends PartialType(MarcDto){}