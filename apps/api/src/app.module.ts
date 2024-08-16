import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { ContractModule } from './contract/contract.module';
import { MotorcycleModule } from './motorcycle/motorcycle.module';
import { PgModule } from './models/pg.module';
import { ModelModule } from './model-moto/model.module';
import { MarcModule } from './marc/marc.module';
import { FormaPagoModule } from './forma-pago/forma-pago.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ClientModule, ContractModule, MotorcycleModule, PgModule, ModelModule, MarcModule, FormaPagoModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
