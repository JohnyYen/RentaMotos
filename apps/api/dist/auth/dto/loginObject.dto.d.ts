import { SignObjectDto } from "./signObject.dto";
declare const LoginObjectDto_base: import("@nestjs/common").Type<Partial<SignObjectDto>>;
export declare class LoginObjectDto extends LoginObjectDto_base {
    name: string;
}
export {};
