import { ContractDto } from "./contract.dto";
declare const ContractPartialDto_base: import("@nestjs/common").Type<Partial<Omit<ContractDto, "idCliente" | "beginDate" | "firmaDate" | "matricula">>>;
export declare class ContractPartialDto extends ContractPartialDto_base {
}
export {};
