import { ContractDto } from "./contract.dto";
declare const ContractPartialDto_base: import("@nestjs/common").Type<Partial<Omit<ContractDto, "beginDate" | "firmaDate" | "idCliente" | "matricula">>>;
export declare class ContractPartialDto extends ContractPartialDto_base {
}
export {};
