import { PartialType } from "@nestjs/mapped-types";
import { ModelDto } from "./model.dto";

export class ModelPatchDto extends PartialType(ModelDto){}