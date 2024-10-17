import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PgModule } from 'src/models/pg.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports : [PgModule, AuthModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
