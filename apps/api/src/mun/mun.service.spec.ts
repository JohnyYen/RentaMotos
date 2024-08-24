import { Test, TestingModule } from '@nestjs/testing';
import { MunService } from './mun.service';

describe('MunService', () => {
  let service: MunService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MunService],
    }).compile();

    service = module.get<MunService>(MunService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
