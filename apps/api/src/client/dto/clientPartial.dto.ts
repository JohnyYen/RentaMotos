import { OmitType, PartialType } from "@nestjs/swagger";
import { ClientDto } from "./client.dto";

export class ClientPartialDto extends PartialType(OmitType(ClientDto, ['edad', 'idCliente'])){
    
}