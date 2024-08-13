import { PartialType } from "@nestjs/mapped-types";
import { ClientDto } from "./client.dto";

export class ClientPatchDto extends PartialType(ClientDto){}