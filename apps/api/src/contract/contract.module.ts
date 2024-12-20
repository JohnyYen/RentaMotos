import { Module } from '@nestjs/common';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { PgModule } from '../pg/pg.module';

@Module({
  imports : [PgModule],
  controllers: [ContractController],
  providers: [ContractService]
})
export class ContractModule {}
