import { OmitType, PartialType } from "@nestjs/swagger";
import { ContractDto } from "./contract.dto";

export class ContractPartialDto extends PartialType(OmitType(ContractDto, ['beginDate', 'firmaDate', 'idCliente', 'matricula'])){

}