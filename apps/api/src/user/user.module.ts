import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PgModule } from 'src/models/pg.module';

@Module({
  imports : [PgModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
