import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PgModule } from 'src/pg/pg.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports : [PgModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
