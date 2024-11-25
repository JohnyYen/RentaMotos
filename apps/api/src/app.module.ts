import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { ContractModule } from './contract/contract.module';
import { MotorcycleModule } from './motorcycle/motorcycle.module';
import { PgModule } from './pg/pg.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailsModule } from './mails/mails.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ClientModule, ContractModule, MotorcycleModule, PgModule, UserModule, AuthModule, MailsModule, ConfigModule.forRoot({
    isGlobal:true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
