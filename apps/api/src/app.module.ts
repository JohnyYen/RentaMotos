import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { ContractModule } from './contract/contract.module';
import { MotorcycleModule } from './motorcycle/motorcycle.module';
import { PgModule } from './models/pg.module';

@Module({
  imports: [ClientModule, ContractModule, MotorcycleModule, PgModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
