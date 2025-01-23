import { Module } from '@nestjs/common';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { PgModule } from '../pg/pg.module';
import { MailsModule } from 'src/mails/mails.module';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports : [PgModule, MailsModule, ClientModule],
  controllers: [ContractController],
  providers: [ContractService]
})
export class ContractModule {}
