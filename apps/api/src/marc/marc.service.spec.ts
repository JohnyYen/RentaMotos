import { Test, TestingModule } from '@nestjs/testing';
import { MarcService } from './marc.service';

describe('MarcService', () => {
  let service: MarcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarcService],
    }).compile();

    service = module.get<MarcService>(MarcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
