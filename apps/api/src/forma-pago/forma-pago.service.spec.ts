import { Test, TestingModule } from '@nestjs/testing';
import { FormaPagoService } from './forma-pago.service';

describe('FormaPagoService', () => {
  let service: FormaPagoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormaPagoService],
    }).compile();

    service = module.get<FormaPagoService>(FormaPagoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
