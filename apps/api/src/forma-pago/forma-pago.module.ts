import { Module } from '@nestjs/common';
import { FormaPagoController } from './forma-pago.controller';
import { FormaPagoService } from './forma-pago.service';

@Module({
  controllers: [FormaPagoController],
  providers: [FormaPagoService]
})
export class FormaPagoModule {}
