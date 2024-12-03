import { OmitType, PartialType } from "@nestjs/swagger";
import { MotorcycleDto } from "./motorcycle.dto";

export class MotorcyclePartial extends PartialType(OmitType(MotorcycleDto, ['matricula'])){
    
}