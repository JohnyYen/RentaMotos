import { PartialType } from "@nestjs/mapped-types";
import { ContractDto } from "./contract.dto";

export class ContractPatchDto extends PartialType(ContractDto){}