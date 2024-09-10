import { Module } from '@nestjs/common';
import { MunController } from './mun.controller';
import { MunService } from './mun.service';
import { PgModule } from 'src/models/pg.module';

@Module({
  imports: [PgModule],
  controllers: [MunController],
  providers: [MunService]
})
export class MunModule {}
