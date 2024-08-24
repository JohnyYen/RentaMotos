import {PartialType} from '@nestjs/mapped-types'
import { MotorcycleDto } from './motorcycle.dto';

export class MotorcyclePatchDto extends PartialType(MotorcycleDto){}