import { Module } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { PgModule } from 'src/models/pg.module';

@Module({
  imports: [PgModule],
  providers: [PagosService],
  controllers: [PagosController]
})
export class PagosModule {}
