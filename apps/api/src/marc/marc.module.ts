import { Module } from '@nestjs/common';
import { MarcService } from './marc.service';
import { MarcController } from './marc.controller';
import { PG_CONNECTION } from 'src/constants';
import { PgModule } from 'src/models/pg.module';

@Module({
  imports : [PgModule],
  providers: [MarcService],
  controllers: [MarcController]
})
export class MarcModule {}
