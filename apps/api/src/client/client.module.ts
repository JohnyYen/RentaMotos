import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { PgModule } from 'src/pg/pg.module';

@Module({
  imports: [PgModule],
  controllers: [ClientController],
  providers: [ClientService]
})
export class ClientModule {}
