import { Module } from '@nestjs/common';
import { FormaPagoController } from './forma-pago.controller';
import { FormaPagoService } from './forma-pago.service';
import { PgModule } from 'src/models/pg.module';

@Module({
  imports : [PgModule],
  controllers: [FormaPagoController],
  providers: [FormaPagoService]
})
export class FormaPagoModule {}
