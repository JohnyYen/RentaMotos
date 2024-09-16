import { Module } from '@nestjs/common';
import { SituationController } from './situation.controller';
import { SituationService } from './situation.service';
import { PgModule } from 'src/models/pg.module';

@Module({
  imports: [PgModule],
  controllers: [SituationController],
  providers: [SituationService]
})
export class SituationModule {}
