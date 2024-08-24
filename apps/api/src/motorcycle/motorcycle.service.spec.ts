import { Test, TestingModule } from '@nestjs/testing';
import { MotorcycleService } from './motorcycle.service';

describe('MotorcycleService', () => {
  let service: MotorcycleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MotorcycleService],
    }).compile();

    service = module.get<MotorcycleService>(MotorcycleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
