import { ClientDto } from "./client.dto";
declare const ClientPartialDto_base: import("@nestjs/common").Type<Partial<Omit<ClientDto, "idCliente" | "edad">>>;
export declare class ClientPartialDto extends ClientPartialDto_base {
}
export {};
