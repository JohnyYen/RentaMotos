import { Module } from '@nestjs/common';
import { MotorcycleController } from './motorcycle.controller';
import { MotorcycleService } from './motorcycle.service';
import { PgModule } from 'src/models/pg.module';

@Module({
  imports: [PgModule],
  controllers: [MotorcycleController],
  providers: [MotorcycleService]
})
export class MotorcycleModule {}
