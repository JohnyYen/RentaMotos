import { ClientDto } from "./client.dto";
declare const ClientPartialDto_base: import("@nestjs/common").Type<Partial<Omit<ClientDto, "edad" | "idCliente">>>;
export declare class ClientPartialDto extends ClientPartialDto_base {
}
export {};
