import { Module } from '@nestjs/common';
import { ModelController } from './model.controller';
import { ModelService } from './model.service';
import { PgModule } from 'src/models/pg.module';

@Module({
  imports : [PgModule],
  controllers: [ModelController],
  providers: [ModelService]
})
export class ModelModule {}
